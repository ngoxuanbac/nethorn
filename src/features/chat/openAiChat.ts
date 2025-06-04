import { Message } from "../messages/messages";

export async function getChatResponseStream(
  messages: Message[],
  openRouterKey: string
) {
  const stream = new ReadableStream({
    async start(controller: ReadableStreamDefaultController) {
      try {
        const OPENROUTER_API_KEY = openRouterKey;

        let isStreamed = false;
        const generation = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${OPENROUTER_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "google/gemini-2.0-flash-001",
              messages: messages,
              temperature: 0.7,
              max_tokens: 200,
              stream: true,
            }),
          }
        );

        if (generation.body) {
          const reader = generation.body.getReader();
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              // Assuming the stream is text, convert the Uint8Array to a string
              const chunk = new TextDecoder().decode(value);
              // Process the chunk here (e.g., append it to the controller for streaming to the client)
              // console.log(chunk); // Or handle the chunk as needed

              // split the chunk into lines
              let lines = chunk.split("\n");

              const SSE_COMMENT = ": OPENROUTER PROCESSING";

              // filter out lines that start with SSE_COMMENT
              lines = lines.filter(
                (line) => !line.trim().startsWith(SSE_COMMENT)
              );

              // filter out lines that end with "data: [DONE]"
              lines = lines.filter(
                (line) => !line.trim().endsWith("data: [DONE]")
              );

              // Filter out empty lines and lines that do not start with "data:"
              const dataLines = lines.filter((line) =>
                line.startsWith("data:")
              );

              // Extract and parse the JSON from each data line
              const messages = dataLines.map((line) => {
                // Remove the "data: " prefix and parse the JSON
                const jsonStr = line.substring(5); // "data: ".length == 5
                return JSON.parse(jsonStr);
              });

              // loop through messages and enqueue them to the controller

              try {
                messages.forEach((message) => {
                  const content = message.choices[0].delta.content;

                  controller.enqueue(content);
                });
              } catch (error) {
                // log the messages
                console.log("error processing messages:");
                console.log(messages);

                throw error;
              }
              isStreamed = true;
            }
          } catch (error) {
            console.error("Error reading the stream", error);
          } finally {
            reader.releaseLock();
          }
        }

        // handle case where streaming is not supported
        if (!isStreamed) {
          console.error("Streaming not supported! Need to handle this case.");
        }
      } catch (error) {
        controller.error(error);
      } finally {
        controller.close();
      }
    },
  });

  return stream;
}
