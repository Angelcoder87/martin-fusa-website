
import { neon } from '@neondatabase/serverless';

const allowedTopics = [
  'Roads and infrastructure',
  'Water and sanitation',
  'Security',
  'Youth and sports',
  'Small businesses and enterprise',
  'Other community concerns',
];

export default async (request) => {
  if (request.method !== 'POST') {
    return Response.json(
      { error: 'Method not allowed.' },
      { status: 405 }
    );
  }

  try {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      throw new Error('Database configuration is missing.');
    }

    const body = await request.json();
    // Ignore automated submissions that fill the honeypot
if (body.website?.trim()) {
  return Response.json(
    { success: true, message: 'Your message has been received.' },
    { status: 201 }
  );
}

// Verify Cloudflare Turnstile token
const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
const turnstileToken = body.turnstileToken;

if (!turnstileSecret) {
  throw new Error('Turnstile secret key is missing.');
}

if (!turnstileToken) {
  return Response.json(
    { error: 'Please complete the security check.' },
    { status: 400 }
  );
}

const verificationResponse = await fetch(
  'https://challenges.cloudflare.com/turnstile/v0/siteverify',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      secret: turnstileSecret,
      response: turnstileToken,
    }),
  }
);

const verificationResult = await verificationResponse.json();

if (!verificationResult.success) {
  return Response.json(
    { error: 'Security verification failed. Please try again.' },
    { status: 403 }
  );
}
    // Silently ignore automated submissions that fill the honeypot
if (body.website?.trim()) {
  return Response.json(
    {
      success: true,
      message: 'Your message has been received.',
    },
    { status: 201 }
  );
}

    const name = body.name?.trim();
    const estate = body.estate?.trim();
    const topic = body.topic?.trim();
    const message = body.message?.trim();
    const consent = body.consent;

    // Require privacy consent
    if (consent !== true) {
      return Response.json(
        { error: 'Please accept the Privacy Notice before submitting.' },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!name || !estate || !topic || !message) {
      return Response.json(
        { error: 'Please complete all fields.' },
        { status: 400 }
      );
    }

    // Validate field lengths
    if (
      name.length > 100 ||
      estate.length > 100 ||
      message.length < 10 ||
      message.length > 2000
    ) {
      return Response.json(
        { error: 'One or more fields are invalid.' },
        { status: 400 }
      );
    }

    // Only accept the available form topics
    if (!allowedTopics.includes(topic)) {
      return Response.json(
        { error: 'Please select a valid topic.' },
        { status: 400 }
      );
    }

    const sql = neon(databaseUrl);

    await sql`
      INSERT INTO resident_messages
      (name, estate, topic, message, privacy_consent_at)
      VALUES
      (${name}, ${estate}, ${topic}, ${message}, NOW())
    `;

    return Response.json(
      {
        success: true,
        message: 'Your message has been received.',
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Message submission failed:', error.message);

    return Response.json(
      {
        error: 'We could not receive your message. Please try again.',
      },
      { status: 500 }
    );
  }
};

export const config = {
  path: '/api/submit-message',
};

