function scrape() {
    let elements = [...document.querySelectorAll("tr[valign=TOP]")]
    elements.shift()

    let articles = elements.map(elem => {
        let paragraphs = elem.children[1].innerText.split("\n").filter(p => p != "")
        paragraphs.shift()

        return {
            "id": elem.children[1].querySelector("b").innerText.split(" ")[1],
            "name": elem.children[0].innerText,
            "paragraphs": paragraphs
        }
    })

    let title = document.querySelector("td[align=CENTER] a").innerText.split("\n")

    return {
        "id": title[0].split(" ")[1],
        "name": title[1],
        "articles": articles
    }
}

scrape()
