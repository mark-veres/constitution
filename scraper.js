function getParagraphs(elem) {
    let paragraphs = [...elem.childNodes].filter(c => (c.nodeName == "#text") || (c.nodeName == "P"))

    return paragraphs.map(p => {
        if (p.childNodes.length == 0) return { "content": p.data.trim(), "subpoints": [] }

        let txts = [...p.childNodes].filter(c => c.nodeName == "#text")
        let content = txts.shift()
        return { "content": content.data.trim(), "subpoints": txts.map(t => t?.data?.trim()) }
    })
}

function pageToJSON() {
    let elements = [...document.querySelectorAll("tr[valign=TOP]")]
    elements.shift()

    let articles = elements.map(elem => {
        return {
            "id": elem.children[1].querySelector("b").innerText.split(" ")[1],
            "name": elem.children[0].innerText,
            "paragraphs": getParagraphs(elem.children[1].childNodes[0])
        }
    })

    let title = document.querySelector("td[align=CENTER] a").innerText.split("\n")

    return {
        "id": title[0].split(" ")[1],
        "name": title[1],
        "articles": articles
    }
}

function scrape() {
    let result = JSON.parse(localStorage.getItem("result")) ?? []
    result.push(pageToJSON())
    localStorage.setItem("result", JSON.stringify(result))
}

scrape()