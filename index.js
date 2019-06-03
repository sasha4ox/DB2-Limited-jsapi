// let swapi = new URL('https://swapi.co/api/');
let app = document.getElementById("app");

const request = async () => {
    const swapi = await fetch('https://swapi.co/api/');
    // const films = await fetch('https://swapi.co/api/films/?page=8');
    // const people = await fetch('https://swapi.co/api/people/?page=9');
    // const planets = await fetch('https://swapi.co/api/planets/');
    // const species = await fetch('https://swapi.co/api/species/');
    // const vehicles = await fetch('https://swapi.co/api/vehicles/');
    // const starships = await fetch('https://swapi.co/api/starships/');
    const json = await swapi.json();
    // const filmsJson = await films.json();
    // const peopleJson = await people.json();
    // const planetsJson = await planets.json();
    // const speciesJson = await species.json();
    // const vehiclesJson = await vehicles.json();
    // const starshipsJson = await starships.json();
    // console.log(json);
    // console.log(films);
    // console.log(filmsJson);
    // console.log(peopleJson);
    // console.log(planetsJson);
    // console.log(speciesJson);
    // console.log(vehiclesJson);
    // console.log(starshipsJson);
    
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
                        console.log(x)
                        
                      let names =  x.map(unit=>{
                       function fetching(unit){
                        
                            app.insertAdjacentHTML('beforeend', `<div id="${unit.title || unit.name}"  class="units">${unit.title || unit.name}</div>`)
                            console.log(unit)
                            idUnit = document.getElementById(`${unit.title || unit.name}`)
                                idUnit.addEventListener("click",(e)=>{
                                if(unit.title || unit.name === e.target.id){
                                    app.innerHTML = "";
                                    for (let item in unit){
                                       console.log(unit[item].length!== 0)
                                        if (Array.isArray(unit[item])&& unit[item]!== 0){
                                            
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



                            ////////
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

                // function nextIteration(corsChild){
                //     while (counIteration > 0) {
                //         counIteration--
                //         if(Object.prototype.toString.call(corsChild) === "[object String]"){
                //                fetch(corsChild)
                //                 .then(response => response.json())
                //                 .then(corsChild => {
                //                     g = corsChild.results.map(x=>{
                //                         return x
                //                         // return console.log(x.name)
                                        
                //                     })
                //                 })
                //         }else{
                //             g = corsChild.results.map(x=>{
                //                 return x
                //                 // return console.log(x.name)
                                
                //             })
                //         }
                         
                //         console.log(g)
                //         nextIteration(corsChild.next)
                //     }
                // }

               
                
            })()
            
            
        })
    })

   

}
request();




// fetch(swapi)
//     .then(response => response.json())
//     .then(datas => {
//         console.log(datas)
//         for (let data in datas){
//             app.insertAdjacentHTML('beforeend', `<div id="${data}"  class="root">${data}</div>`);
//         }
//         // Do what you want with your data
//         let root = document.getElementsByClassName("root");
//         Array.from(root).forEach(x=>{
//             x.addEventListener("click",(e)=>{
//                 let rootChild =  e.target.id;
//                 fetch(datas[rootChild])
//                     .then(response=> response.json())
//                     .then(datas=>{
//                         function next(x,z){
//                             console.log(x)
//                             if (x.previous === null){
//                                 x.results.forEach(x=>{
//                                     if (x.name ===undefined){
//                                         app.insertAdjacentHTML('beforeend', `<div id="${x.title}" class="people">${x.title}</div>`);
//                                     } else {
//                                         app.insertAdjacentHTML('beforeend', `<div id="${x.name}" class="people">${x.name}</div>`);
//                                     }
                                    
//                                 })  
//                                 next(x.next)
//                           } else if (x.next !==null){
//                               console.log(x)
//                                 fetch(x)
//                                     .then(response=> response.json())
//                                     .then(result=>{
//                                         result.results.forEach(x=>{
//                                             app.insertAdjacentHTML('beforeend', `<div id="${x.name}" class="people">${x.name}</div>`);
//                                           })
//                                           next(x.next)   
//                                      })   
//                           } 
                       
                            
//                          }
//                          next(datas)
//                     })
//             })
//         })







 //   else{
                        //     fetch(x)
                        //     .then(response=> response.json())
                        //     .then(result=>{
                        //         result.results.forEach(x=>{
                        //             app.insertAdjacentHTML('beforeend', `<div id="${x.name}" class="people">${x.name}</div>`);
                        //          })
                        //     })   
                        //   }



    //     fetch(datas.people)
    //         .then(response=> response.json())
    //         .then(datas=>{
    //             // app.innerHTML = ""
    //             // let people = document.getElementById("people");
    //             // let peopleAbout = document.getElementById("peopleAbout");
    //             function next(x,z){
    //                if (x.previous === null){
    //                         x.results.forEach(x=>{
    //                             app.insertAdjacentHTML('beforeend', `<div id="${x.name}" class="people">${x.name}</div>`);
    //                              })
    //                     next(x.next)      
    //                 } else if (x.next !==null){
    //                     fetch(x)
    //                         .then(response=> response.json())
    //                         .then(result=>{
    //                             result.results.forEach(x=>{
    //                                 app.insertAdjacentHTML('beforeend', `<div id="${x.name}" class="people">${x.name}</div>`);
    //                              })
    //                              next(result.next)   
    //                         })   
    //                 } 
                   
    //             }
    //             next(datas)

                
           
    // })
    

    // })
