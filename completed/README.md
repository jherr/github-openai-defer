## GitHub Readme OpenAI Generator 

This Next.js app (_with app directory_) leverages Defer using GitHub data as a prompt for OpenAI completion API. 

## Getting started

### 1. Install the dependencies

```
yarn
```

### 2. Deploy on Vercel and Defer

Make sure to get a [GitHub personal access token](https://github.com/settings/tokens) and [an OpenAI API Key](https://platform.openai.com/account/api-keys).

Then, [configure the application on Defer and Vercel](https://docs.defer.run/quickstart/next/).

<br/>

## How it works

The Next.js API Route `/api/gitHubProfile/[usernameOrExecID]` is used as follow:

- Trigger a new generation: `POST /api/gitHubProfile/charlypoly`
- Get the status and result of a profile text generation: `GET /api/gitHubProfile/2MeNNf2OTVZP0MUrs1ghwXaUtm4`

<br/>

The `generateGitHubProfile()` Defer background function handles fetching data from GitHub and forwarding the proper prompt to OpenAI.

Triggering an execution of `generateGitHubProfile()` is achieved by simply calling it from the Next.js API Route:

```ts
import { NextRequest, NextResponse } from "next/server";
import generateGitHubProfile from "@/defer/generateGitHubProfile";

export async function POST(
  _request: NextRequest,
  { params }: { params: { usernameOrExecId: string } }
) {
  const ret = await generateGitHubProfile(params.usernameOrExecId);
  return NextResponse.json(ret);
}
```
