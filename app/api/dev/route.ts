import { handleActionError } from '@/lib/utils/error';
import { getVectorStoreData } from '@/lib/utils/vectorStore';
import { NextResponse } from 'next/server';

// GETT /api/dev/[param]
export const GET = async (
  request: Request,
  { params }: { params: { param: string } }
) => {
  const param = params.param;

  if (!param) {
    return NextResponse.json(
      { message: 'Invalid url param.' },
      { status: 400 }
    );
  }

  try {
    // const res = await fetchChat({ chatId });
    // if (res && !res?.success) {
    //   return NextResponse.json({ message: res.error.message }, { status: 400 });
    // }
    // return NextResponse.json({ data: res?.data }, { status: 200 });
    return NextResponse.json({ data: 'dev' }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
};

// POST /api/dev
export async function POST(req: Request) {
  const data = await req.json();
  if (!data) {
    return NextResponse.json(
      { message: 'Invalid request body data.' },
      { status: 400 }
    );
  }

  // const personKey = data.personKey;

  try {
    // const vectorStore = await getVectorStoreData(personKey);
    // return NextResponse.json({ vectorStore }, { status: 200 });

    return NextResponse.json({ data: 'dev' }, { status: 200 });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
