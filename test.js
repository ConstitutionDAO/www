const peopleTag = (name, location, twitter) => `
<div class="person">
            <div class="info">
              <h1>${name}</h1>
              <p>${location}</p>
            </div>
            <a class="twitter" target="_blank" href="${twitter}"><img width="40" height="40" src="/assets/images/twitter.png"/></a>
          </div>
`


const people = [
    {
      "name": "Adrienne Young",
      "location": "San Francisco, CA",
      "twitter": "https://twitter.com/adriyoung"
    },
    {
      "name": "Alice Ma",
      "location": "New York, NY",
      "twitter": "https://twitter.com/alicemama15"
    },
    {
      "name": "",
      "location": "",
      "twitter": "https://twitter.com/ngeloxyz"
    },
    {
      "name": "Austin Cain",
      "location": "Atlanta, GA",
      "twitter": "https://twitter.com/j_austincain"
    },
    {
      "name": "",
      "location": "",
      "twitter": ""
    },
    {
      "name": "Brian Wagner",
      "location": "Brooklyn, NY",
      "twitter": "https://twitter.com/bhwags"
    },
    {
      "name": "Jusung Lee",
      "location": "New York, NY",
      "twitter": "https://twitter.com/0xJuicero"
    },
    {
      "name": "",
      "location": "",
      "twitter": ""
    },
    {
      "name": "Conner Swenberg",
      "location": "USA",
      "twitter": "https://twitter.com/cswenberg_"
    },
    {
      "name": "Daniel",
      "location": "NYC/Seattle",
      "twitter": "https://twitter.com/sadlyoddisfying"
    },
    {
      "name": "Erik Van Winkle",
      "location": "Atlanta, GA",
      "twitter": "https://twitter.com/erik_vanwinkle"
    },
    {
      "name": "",
      "location": "",
      "twitter": "https://twitter.com/ghosttyped"
    },
    {
      "name": "Graham Novak",
      "location": "Atlanta, GA",
      "twitter": "https://twitter.com/gnovak_"
    },
    {
      "name": "Ian Dilick",
      "location": "Chicago, IL",
      "twitter": "https://twitter.com/imdilick"
    },
    {
      "name": "Ittai Svidler",
      "location": "Chicago, IL",
      "twitter": "https://twitter.com/IttaiSvidler"
    },
    {
      "name": "James Robinson",
      "location": "The Internet",
      "twitter": ""
    },
    {
      "name": "",
      "location": "",
      "twitter": ""
    },
    {
      "name": "Jon Hillis",
      "location": "Austin, TX",
      "twitter": "https://twitter.com/JonathanHillis"
    },
    {
      "name": "",
      "location": "",
      "twitter": "https://twitter.com/Nogoodtwts"
    },
    {
      "name": "Kyle Billings",
      "location": "Denver, CO",
      "twitter": "https://twitter.com/kyle_billings"
    },
    {
      "name": "Lily Chang",
      "location": "Berlin, Germany",
      "twitter": "https://twitter.com/slowgraffitii"
    },
    {
      "name": "Liminal Warmth",
      "location": "Los Angeles, CA",
      "twitter": "https://twitter.com/liminal_warmth"
    },
    {
      "name": "Mackenzie Burnett",
      "location": "San Francisco, CA",
      "twitter": "https://twitter.com/ciaomack"
    },
    {
      "name": "Miguel Piedrafita",
      "location": "",
      "twitter": "https://twitter.com/m1guelpf"
    },
    {
      "name": "Mihir Patel",
      "location": "New York, NY",
      "twitter": "https://twitter.com/_mihirpatel"
    },
    {
      "name": "Munam Wasi",
      "location": "Manhattan Beach, CA",
      "twitter": "https://twitter.com/MunamWasi"
    },
    {
      "name": "Nicole Ruiz",
      "location": "New York, NY",
      "twitter": "https://twitter.com/nwilliams030"
    },
    {
      "name": "Packy McCormick",
      "location": "New York, NY",
      "twitter": "https://twitter.com/packyM"
    },
    {
      "name": "Tina",
      "location": "San Francisco, CA",
      "twitter": "https://twitter.com/patagucci_girl"
    },
    {
      "name": "Theo Bleier",
      "location": "Boston, MA",
      "twitter": "https://twitter.com/theombl"
    },
    {
      "name": "David Silverman",
      "location": "New York, NY",
      "twitter": "https://twitter.com/davidesilverman"
    },
    {
      "name": "Julian Weisser",
      "location": "Sioux Falls, SD",
      "twitter": "https://twitter.com/julianweisser"
    },
    {
      "name": "Will Papper",
      "location": "San Francsico, CA",
      "twitter": "https://twitter.com/WillPapper"
    },
    {
      "name": "Anisha",
      "location": "San Francisco, CA",
      "twitter": "https://twitter.com/youfoundanisha"
    }
  ]

let output = ""

people.forEach((p) => {
    if (!p.name || !p.location) return

    output += (peopleTag(p.name, p.location, p.twitter) + '\n')
})

console.log(output)