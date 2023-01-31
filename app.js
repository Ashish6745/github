const APIURL = "https://api.github.com/users/";
// targeting the main ....... here using queryselector
const main = document.querySelector("#main"); 
const searchBox = document.querySelector("#search")

const getUser = async (username) => {
  const response = await fetch(APIURL + username);
  // here we are taking data from url
  const data = await response.json();
//  console.log(data);
  const card = ` 
  <div class="card">
  <div>
      <img class="avatar" src=${data.avatar_url} alt="Florin Pop" />
  </div>
  <div class="user-info">
      <h2>${data.name}</h2>
      <p>${data.bio}</p>
      <ul class="info">
          <li>${data.followers}<strong>Followers</strong></li> 
          <li>${data.following}<strong>Following</strong></li>
          <li>${data.public_repos}<strong>Repos</strong></li>
      </ul>
      <div  id="repos">
         
      </div>
  </div>

</div>`

    main.innerHTML = card;
    getRepos(username)
}

getUser("bhagirath-wscubetech");

const getRepos = async(username) => {
    const repos = document.querySelector("#repos");
    const response = await fetch(APIURL + username + "/repos")
    const data = await response.json();
    data.forEach(
        (item) => {
            //creating an list in elem 
            const elem = document.createElement("a")
            //adding class to repo for anchor tag
            elem.classList.add("repo");
            // adding url to href
            elem.href = item.html_url
            //taking name 
            elem.innerText = item.name
            // it will open it in new tab
            elem.target = "_blank"
            repos.appendChild(elem)
        }
    )
}
const formSubmit = () => {
    
    // if value of search is not null
    if(searchBox.value != ""){
        getUser(searchBox.value);
        //after searching an value we have empty the value of input.......
        searchBox.value=" "
    }
    return false;

}
searchBox.addEventListener(
    "focusout",
    function() {
        formSubmit();
    }
)






{/*<a class="repo" href="#" target="_blank">Repo 1</a>
<a class="repo" href="#" target="_blank">Repo 2</a>
<a class="repo" href="#" target="_blank">Repo 3</a>*/}



