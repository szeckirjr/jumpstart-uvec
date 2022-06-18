import { Configuration, OpenAIApi } from "openai";

export async function handleOpenAIAPI(
  prompt: string,
  setPrompt: (val: string) => void,
  setLoading: (val: boolean) => void
) {
  console.log(process.env.REACT_APP_OPENAI_API_KEY);
  const configuration = new Configuration({
    apiKey: "",
  });
  const openai = new OpenAIApi(configuration);
  if (prompt.trim() === "") return;
  setLoading(true);
  const tempPrompt = "Outline steps needed to" + prompt;
  setPrompt("");
  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: tempPrompt,
    temperature: 0,
    max_tokens: 256,
    best_of: 3,
  });

  setLoading(false);
  console.log(response);
  return response;
}
