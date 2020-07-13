window._loadLoading = (options={})=>{
    if (window.setLoading) throw "Loading.js already loaded.";

    let styleElement = document.createElement("style");
    styleElement.id = "loading-style";
    styleElement.innerHTML = `#loading {position: absolute; top: 0; left: 0; width: 100vw; height: 100vh; padding: 0; margin: 0; z-index: ${options.zIndex ? options.zIndex : "999999999"}; opacity: 0; pointer-events: none; transition: ${options.transition ? options.transition : "100ms"}; background-color: ${options.backgroundColor ? options.backgroundColor : "rgba(0, 0, 0, 0.5)"};} #loading.showing {opacity: 1; pointer-events: all;} #loading #loading-text {text-align: center; line-height: 100vh; padding: 0; margin: 0; user-select: none; color: ${options.color ? options.color : "white"}; font-family: ${options.fontFamily ? options.fontFamily : `"Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif`};}`;
    document.body.appendChild(styleElement);

    let loadingElement = document.createElement("div");
    loadingElement.id = "loading";

    let loadingTextElement = document.createElement("h1");
    loadingTextElement.id = "loading-text";
    loadingElement.appendChild(loadingTextElement);

    document.body.appendChild(loadingElement);

    window.setLoading = (text="")=>{
        if (text) {
            loadingElement.classList.add("showing");
            loadingTextElement.innerHTML = text.replace(/\[\.\.\.\]/gm, "");
            loadingTextElement.setAttribute("l-text", text);
            return true;
        } else {
            loadingElement.classList.remove("showing");
            loadingTextElement.innerHTML = "";
            loadingTextElement.removeAttribute("l-text", "");
            return false;
        }
    }

    window.showLoading = (text="Loading[...]")=>{
        loadingElement.classList.add("showing");
        loadingTextElement.innerHTML = text.replace(/\[\.\.\.\]/gm, "");
        loadingTextElement.setAttribute("l-text", text);
    }

    window.hideLoading = ()=>{
        loadingElement.classList.remove("showing");
        loadingTextElement.innerHTML = "";
        loadingTextElement.removeAttribute("l-text", "");
    }

    let loadingDotsAmount = 1;

    setInterval(()=>{

        let loadingText = document.querySelector("#loading-text");
        if ((loadingText.getAttribute("l-text") || "").includes("[...]")) {

            if (loadingDotsAmount > 3) loadingDotsAmount = 0;
            loadingText.innerHTML = loadingText.getAttribute("l-text").replace(/\[\.\.\.\]/gm,".".repeat(loadingDotsAmount));
            loadingDotsAmount++;

        }

    },1000);
}
window._loadLoading();
