import { parse } from "csv-parse";

const configParse = parse({
    relax_quotes: true,
    delimiter: ",",
    skipEmptyLines: true,
    fromLine: 2,
})

export async function run(req) {
    const parser = req.pipe(configParse);

    for await (const row of parser) {
      const [title, description] = row;
      console.log("teste");

      await fetch("http://localhost:3333/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });
    }
}