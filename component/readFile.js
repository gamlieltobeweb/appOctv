const fs = require('fs-extra')
const readline = require('readline');

var cron = require('node-cron');
 
// cron.schedule('0 2 * * *', () => {
//     copyFiles()

//   console.log('running a task every minute');
// });


// let pathfile = '../fichierLect/playlist_media.txt'

let rf = [];
let SecondData;
async function copyFiles() {


    try {
        let data = await fs.readFile('../fichierLect/playlist_media.txt', 'utf8')
        // console.log("data",data)
        // let data1 = data.replace('\n',";")
        let data2 = (await data).split(";")
        console.log("ndata", data2.length)
        for (var i = 0; i < 1; i++) {

            // let FirstData = data.replace(/\n/g,";")
            // SecondData = FirstData.split(";")

            // console.log("ndata", data2)
            // var w = SecondData[i].split("\t");
            // console.log("w",w)
            // var w = NewData[i];
            rf.push({
                id: data2[0],
                lastname: data2[1],
                startPlaylist: data2[2],
                endPlaylist: data2[3],
                namePlaylist: data2[6],
                md5: data2[8].replace(/\n/g,"")
            });
        }
        console.log('====================================');
        // console.log(SecondData);
        console.log(rf);
        console.log('====================================');

        //   console.log(w);

    } catch (err) {
        console.error(err)
    }
}

copyFiles()