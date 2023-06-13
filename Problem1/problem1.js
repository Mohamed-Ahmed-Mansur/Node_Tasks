let list = [];


// Reading the JSON data
fetch('./problem1.json')
    .then(response => response.json())
    .then(data => {
        // Handling data fetched
        // Add height & weight to fluffy and update the name
        data["height"] = "0.5ft";
        data["weight"] = "8kg";
        data["name"] = "Fluffyy";

        // Assign catFriends activites to pre-declared list
        for (let i = 0; i < data.catFriends.length; i++){
            list.push(data.catFriends[i].activities);

            // print thier names & weights
            console.log(data.catFriends[i].name);
            console.log(data.catFriends[i].weight);

        }

        console.log(list);

        // print all activities at once
        list.flat().forEach(item => {
            console.log(item);
        });

        // Add two more activities to each of fluffyy's catfriends
        data.catFriends[0].activities.push("play with ball", "funny");
        data.catFriends[1].activities.push("play with bill", "lazy");
        console.log(data.catFriends);

        // update bar's furcolor to gray
        data.catFriends[0]["furcolor"] = "gray";
        console.log(data.catFriends[0].furcolor);
    }
);

