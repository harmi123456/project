
document.getElementById("submit").addEventListener("click", function () {
    document.querySelector(".container").style.display = "none"
    document.querySelector("#main").style.display = "none"
    document.querySelector(".pan").style.display = "block"
})


//counter

document.getElementById("submit").addEventListener("click", function () {
    let start = 5
    let stop = setInterval(() => {
        start--
        document.getElementById("span").innerHTML = start

        if (start === 0) {
            clearInterval(stop)
            document.querySelector("#main").style.display = "block"
            document.querySelector(".pan").style.display = "none"



            let receipe = document.getElementById("name").value
            let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${receipe}`

            fetch(url)
                .then(res => res.json())
                .then(json => {
                    // console.clear()
                    // console.log(json)
                    // displayData(json)

                    if (json.meals && json.meals.length > 0) {
                        console.clear()
                        console.log(json)
                        displayData(json)

                        // Print in local storage
                        let users = JSON.parse(localStorage.getItem("Users")) || [];
                        let user = json.meals[0].strMeal;
                        let ing = " ingridients : " + json.meals[0].strIngredient1

                        let obj = {
                            name: user + ing
                        };

                        users.push(obj);

                        localStorage.setItem("Users", JSON.stringify(users));
                        document.getElementById("name").value = "";
                    } else {
                        console.log("Don't match any data...");
                    }

                }).catch(error => {
                    console.log("Don't match any data...")
                })


        }
    }, 1000)

})


//logic


function displayData(json) {
    document.getElementById("main").innerHTML = ""

    let div = document.createElement("div")

    document.getElementById("main").value

    let name = document.createElement("h1")
    name.innerHTML = `${json.meals[0].strMeal} <br>`
    name.style.textDecoration = "underline"

    let p = document.createElement("p")
    p.innerHTML = "2 Servings | Cook Time 20-30 MINUTES"

    let ingri_div = document.createElement("div")
    ingri_div.className = "ingri"

    let h5 = document.createElement("h5");
    h5.textContent = "Ingredients";
    h5.id = "ing"

    let line_img = document.createElement("img");
    // line_img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOjOKnqzcz07Nlm8H9uoOXfGHExpVSw35oS13Yyd9awMv3_5rPtKLJ1h5C0B9KT660d8E&usqp=CAU";
    line_img.src = "https://t4.ftcdn.net/jpg/08/42/09/59/240_F_842095987_pMZ31deF6yacRfoO7bxyFuF8OTRER4aj.jpg"
    line_img.id = "line"

    let ingridient = document.createElement("p")
    ingridient.innerHTML = `${json.meals[0].strIngredient1}` + "," + `${json.meals[0].strIngredient2}` + "," + `${json.meals[0].strIngredient3}` + "," + `${json.meals[0].strIngredient4}` + "," + `${json.meals[0].strIngredient5}` + "," + `${json.meals[0].strIngredient6}` + "," + `${json.meals[0].strIngredient7}` + "," + `${json.meals[0].strIngredient8}` + "," + `${json.meals[0].strIngredient9}` + "," + `${json.meals[0].strIngredient10}` + "," + `${json.meals[0].strIngredient11}`
    ingridient.id = "ingcridient"

    ing = `${json.meals[0].strIngredient1}` + "," + `${json.meals[0].strIngredient2}` + "," + `${json.meals[0].strIngredient3}` + "," + `${json.meals[0].strIngredient4}` + "," + `${json.meals[0].strIngredient5}` + "," + `${json.meals[0].strIngredient6}` + "," + `${json.meals[0].strIngredient7}` + "," + `${json.meals[0].strIngredient8}` + "," + `${json.meals[0].strIngredient9}` + "," + `${json.meals[0].strIngredient10}` + "," + `${json.meals[0].strIngredient11}`
    let ing_edit = document.createElement("button")
    ing_edit.innerHTML = "Add Ingridients"
    ing_edit.id = "edit_ing"
    ing_edit.style.display = "inline"

    let ing_in = document.createElement("input")
    ing_in.id = "add_ing"
    ing_in.placeholder = "Add Ingridients"
    ing_in.style.display = "none"
    let ing_update = document.createElement("button")
    ing_update.innerHTML = "Add Ingridients"
    ing_update.id = "update_ing"
    ing_update.style.display = "none"

    ing_edit.addEventListener("click", function () {
        ing_in.style.display = "inline"
        ing_update.style.display = "inline"
        ing_edit.style.display = "none"
    })

    ing_update.addEventListener("click", function () {
        let new_ing = document.getElementById("add_ing").value
        ingridient.innerHTML = ing + "," + new_ing

        ing_in.style.display = "none"
        ing_update.style.display = "none"
        ing_edit.style.display = "inline"
    })

    let youtube = document.createElement("button");
    youtube.id = "yt";
    youtube.innerHTML = "Watch an Video";
    youtube.id = "Youtube"
    div.appendChild(youtube);

    let strYoutube = document.createElement("iframe");
    strYoutube.src = `https://www.youtube.com/embed/${json.meals[0].strYoutube.split("v=")[1]}`;
    strYoutube.width = "560";
    strYoutube.height = "315";
    strYoutube.allowFullscreen = true;
    strYoutube.style.display = "none";
    div.appendChild(strYoutube);

    youtube.addEventListener("click", function () {
        strYoutube.style.display = "block";
    });

    ingri_div.append(line_img, h5, ingridient, ing_edit, ing_in, ing_update, youtube, strYoutube)

    let img_div = document.createElement("div")
    img_div.className = "img_div"

    let strMealThumb = document.createElement("img");
    strMealThumb.src = `${json.meals[0].strMealThumb}`;
    strMealThumb.className = "image";

    img_div.appendChild(strMealThumb)


    let strInstructions = document.createElement("p")
    strInstructions.innerHTML = `<b>Instructions : </b>${json.meals[0].strInstructions}`

    div.append(name, p, ingri_div, img_div, strInstructions);
    document.getElementById("main").append(div);


}