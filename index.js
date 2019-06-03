let app = document.getElementById("app");

const request = async () => {
    const swapi = await fetch('https://swapi.co/api/');
    const json = await swapi.json();
    let roots;
    let rootsJson = []
    let corsArray =[];
    for (let data in json){
        roots = await fetch(json[data]);
        corsArray.push(roots)
        rootsJson.push( await roots.json());
        app.insertAdjacentHTML('beforeend', `<div id="${data}"  class="root">${data}</div>`);
    }
    let root = document.getElementsByClassName("root")
    Array.from(root).forEach(x=>{
        x.addEventListener("click",(e)=>{
            (async function (){
                let rootChild =  e.target.id;
                const corsChildFetch = await fetch(json[rootChild]);
                let corsChild = await corsChildFetch.json()
                console.log(corsChild)
                let count = corsChild.count;
                let counIteration = Math.floor(count / 10);
                let g;
                app.innerHTML = "";
                async function nextIteration(counIteration){
                    if (counIteration < 0) return
                    g = corsChild.results.map(x=>{
                        return x                            
                    })
                   
                    function getName(x){                
                      let names =  x.map(unit=>{
                       function fetching(unit){
                            app.insertAdjacentHTML('beforeend', `<div id="${unit.title || unit.name}"  class="units">${unit.title || unit.name}</div>`)
                            idUnit = document.getElementById(`${unit.title || unit.name}`)
                                idUnit.addEventListener("click",(e)=>{
                                if(unit.title || unit.name === e.target.id){
                                    app.innerHTML = "";
                                    for (let item in unit){
                                       console.log(unit[item].length!== 0)
                                        if (Array.isArray(unit[item])&& unit[item].length!== 0){ 
                                            app.insertAdjacentHTML('beforeend', `<div id="${item}"  class="inside">${item}&#x1f603;</div>`) 
                                        }else{
                                            app.insertAdjacentHTML('beforeend', `<div id="${item}"  class="unit">${item}: ${unit[item]}</div>`)
                                        }
                                    }
                                    let linksArray = document.getElementsByClassName("inside");
                                    let clickedLink;
                                    Array.from(linksArray).forEach(x=>{
                                        
                                        x.addEventListener("click",(e)=>{
                                            app.innerHTML = "";
                                            clickedLink = unit[e.target.id].map(links=>{
                                                
                                                app.insertAdjacentHTML('beforeend', `<div id="${links}"  class="links">${links}</div>`)
                                              return links
                                            })
                                    let linksArrayL = document.getElementsByClassName("links");    
                                    Array.from(linksArrayL).forEach(x=>{
                                        x.addEventListener("click", (e)=>{
                                            fetch(e.target.id)
                                                .then(res=>res.json())
                                                .then(data=>{
                                                   fetching(data) 
                                                })
                                        })
                                    })                
                                        })
                                    })
                                   
                                }
                            })
                            }
                            fetching(unit)
                        })
                    }
                    getName(g)
                    if (counIteration !== 0){
                        const next = await fetch(corsChild.next);
                        corsChild = await next.json();
                        nextIteration(counIteration -1)
                    }                
                }
                nextIteration(counIteration)
            })()           
        })
    })
}
request();