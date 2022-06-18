import { Configuration, OpenAIApi } from "openai";

export async function handleOpenAIAPI(
    prompt: string,
    setPrompt: (val: string) => void,
    setLoading: (val: boolean) => void,
    setResponse: (val: string) => void
) {
    console.log(process.env.REACT_APP_OPENAI_APIKEY);
    const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_APIKEY,
    });
    const openai = new OpenAIApi(configuration);
    if (prompt.trim() === "") return;
    setLoading(true);
    const tempPrompt = "Outline steps needed to " + prompt;
    setPrompt("");
    const response = openai
        .createCompletion({
            model: "text-davinci-002",
            prompt: tempPrompt,
            temperature: 0,
            max_tokens: 256,
            best_of: 3,
        })
        .then((r) => {
            setLoading(false);
            console.log(r);
            if (r.status === 200) {
                console.log("STATUS IS GOOD!");
                setResponse(r!.data.choices![0].text!);
            } else {
                setResponse("Sorry :( Could not get response form OpenAI API");
            }
        })
        .catch(() => {
            setLoading(false);
            setResponse("Sorry :( Could not get response form OpenAI API");
        });

    return response;
}
