import type { APIContext } from 'astro';
import { Polar } from '@polar-sh/sdk';

const accessToken = import.meta.env.POLAR_ACCESS_TOKEN;
const server =
  import.meta.env.POLAR_SERVER === 'sandbox' ? 'sandbox' : 'production';

const polar =
  accessToken &&
  new Polar({
    accessToken,
    server
  });

export const prerender = false;

export async function GET({ url }: APIContext) {
  if (!polar) {
    return new Response('Polar access token not configured', { status: 500 });
  }

  const planParam = url.searchParams.get('plan');
  const billingParam = url.searchParams.get('billing');

  if (!planParam || !billingParam) {
    return new Response('Checkout endpoint ready.', { status: 200 });
  }

  const plan = planParam;
  const billing = billingParam;

  if (plan !== 'starter' || billing !== 'monthly') {
    return new Response('Checkout not enabled for this plan', { status: 400 });
  }

  const starterPriceId =
    import.meta.env.POLAR_STARTER_MONTHLY_PRICE_ID ||
    import.meta.env.PRODUCT_ID_MENSUAL_PLAN1;
  if (!starterPriceId) {
    return new Response(
      'Starter monthly product price id missing in environment variables.',
      { status: 500 }
    );
  }

  const successUrl = import.meta.env.POLAR_SUCCESS_URL || undefined;
  const returnUrl = import.meta.env.POLAR_RETURN_URL || undefined;

  try {
    const checkout = await polar.checkouts.create({
      productPriceId: starterPriceId,
      successUrl,
      returnUrl
    });

    return Response.redirect(checkout.url, 303);
  } catch (error) {
    console.error('Polar checkout error', error);
    return new Response('Unable to start checkout', { status: 500 });
  }
}

