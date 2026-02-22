import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export async function onRequest(context: any) {
  try {
    const { searchParams } = new URL(context.request.url);

    const title = searchParams.get('title') || 'Watermelon UI';
    const description = searchParams.get('description') || 'High-Quality React Components Registry';
    const category = searchParams.get('category');

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#09090b', // Neutral 950
            padding: '80px',
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              position: 'absolute',
              top: '80px',
              left: '80px',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#FF5112', // Site brand color
                borderRadius: '6px',
                marginRight: '12px',
              }}
            />
            <span
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#ffffff',
              }}
            >
              Watermelon UI
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: '40px',
            }}
          >
            {category && (
              <div
                style={{
                  fontSize: '20px',
                  color: '#FF5112',
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 600,
                }}
              >
                {category}
              </div>
            )}

            <div
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                color: '#ffffff',
                lineHeight: 1.1,
                marginBottom: '24px',
                maxWidth: '1040px',
              }}
            >
              {title}
            </div>

            <div
              style={{
                fontSize: '32px',
                color: '#a1a1aa', // Zinc 400
                lineHeight: 1.4,
                maxWidth: '900px',
              }}
            >
              {description}
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '80px',
              left: '80px',
              color: '#3f3f46', // Zinc 700
              fontSize: '20px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span>ui.watermelon.sh</span>
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#3f3f46', margin: '0 12px' }} />
            <span>Copy & Paste UI</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error(e.message);
    return new Response('Failed to generate image', { status: 500 });
  }
}
