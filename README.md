<h1>Prep AI - An AI Mock Interviewer</h1>
<h2>Prepare for your upcoming interviews with Prep AI</h2>

<h3>Skills used: </h3>
<ul>
    <li>Gemini AI</li>
    <li>Next.JS</li>
    <li>Drizzle ORM</li>
    <li>Postgre SQL</li>
    <li>Clerk</li>
    <li>Tailwind CSS</li>
    <li>ShadCN UI</li>
</ul>

<h2>Key features of this application: </h2>
<ul>
    <li>Collect job information for the upcoming interview</li>
    <li>Generate interview questions through Gemini AI by analysing the job information</Li>
    <li>Web cam functionality to improve the confidence in interviews</Li>
    <li>Record answers through microphone</Li>
    <li>Convert speech to text and store the user answers in database</Li>
    <li>Text to speech functionality to listen to the interview questions</Li>
    <li>Generate rating and feedback through Gemini AI by analysing the recorded answers</Li>
    <li>Practice any previous interviews to upskill</Li>
    <li>Clerk authentication through email or with upto 2 social accounts</Li>
</ul>

<h3>Steps to run this project in your device: </h3>
<p>Create an empty directory and run the following commands in the terminal: </p>

```bash
    git clone https://github.com/Kaarti22/AI-Mock-Interviewer.git

    cd AI-Mock-Interviewer

    npm i
```

<p>Also, create a .env file in the root directory of the project and your environment variables. <br/> The following variables must be added: </p>

```bash
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY =
    CLERK_SECRET_KEY =

    NEXT_PUBLIC_CLERK_SIGN_IN_URL =
    NEXT_PUBLIC_CLERK_SIGN_UP_URL =
    
    NEXT_PUBLIC_DRIZZLE_DB_URL = 

    NEXT_PUBLIC_GEMINI_API_KEY = 

    NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT = 
```

<p>Finally to run this project, enter the following command: </p>

```bash
    npm run dev
```


<p>Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.<br/><br/>You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.<br/></br>This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
</p>