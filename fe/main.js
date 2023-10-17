import "./style.scss";
const basePath = "http://localhost:3000/rechthoekObjecten/";
import randomColor from "randomcolor"; // import the script

async function main() {
  const getResponse = await fetch(basePath);
  const rechthoeken = await getResponse.json();

  const body = document.querySelector("body");

  rechthoeken.forEach((rechthoek) => {
    const div = document.createElement("div");

    div.id = rechthoek.id;
    div.style.backgroundColor = rechthoek.color;
    div.style.width = rechthoek.width + "px";
    div.style.height = rechthoek.height + "px";
    div.style.position = "absolute";
    div.style.top = rechthoek.y + "px";
    div.style.left = rechthoek.x + "px";
    div.onclick = async () => {
      const newColor = randomColor();
      div.style.backgroundColor = newColor;

      const patchResponse = await fetch(basePath + rechthoek.id, {
        method: "patch",
        body: {
          color: newColor,
        },
      });

      const result = await patchResponse.json();

      console.log(result);
    };

    body.appendChild(div);

    // render(listRef);
    // listRef.onclick = async (e) => {
    //   if (e.target.claaList.contains("click")) {
    //     const idToClick = e.target.parentElement.dataset.id;
    //     const response = await fetch(basePath + idToClick, {
    //       metod: "click",
    //     });
    //   }
    // };
  });
}

main();
