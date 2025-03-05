import ky from 'ky';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {

  const token_endpoint = '2-legged-oauth-2-token-endpoint';
  const client_id = '123'
  const client_secret = '456'
  const scope = 'system scope'

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept-Encoding': 'gzip, deflate',
    'Authorization': `Basic ${btoa(`${client_id}:${client_secret}`)}`
  };

  const formData = new URLSearchParams({
    grant_type: 'client_credentials',
    scope,
  });

  const response = await ky(token_endpoint, {
    method: 'POST',
    headers,
    body: formData
  }).json();

  return NextResponse.json(response);
}
