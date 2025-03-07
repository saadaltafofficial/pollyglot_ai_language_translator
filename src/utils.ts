
export async function transaltor(data: string) {
  const userquery = data
  try {
    const messages = [
      { role: 'system', content: 'You are transaltor assistant you will translate to the content to language user is asking for.' },
      { role: "user", content: userquery },
    ]
    // We are using cloudfare workers to host the api
    const url = "https://openai-api-worker.saadbeenco.workers.dev"
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messages)
    })

    const data = await response.json()
    return data.content
    
  } catch (error) {
    console.log(error)
  }
}  