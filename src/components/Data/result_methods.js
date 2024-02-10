


   export const  getAvgMarks=(AttemptedBy,uid)=>{
        
        let totalMarksOfAllStu=0
        let totalTimeOfAllStu=0
        let totalAccuracyOfAllStu=0
        let totalMarksP=0
        let totalMarksC=0
        let totalMarksM=0 
        let res=[]

        for (let i = 0; i < AttemptedBy.length; i++) {
            const userData = AttemptedBy[i];
            if(AttemptedBy[i]['uid']===uid){
                res.push({...userData,rank:i+1})
            }
            totalMarksOfAllStu=totalMarksOfAllStu+userData["marks"]
            let t=userData['time']
            let p=userData['phy']
            let c=userData['chem']
            let m=userData['math']
            let totalC=p[1]+c[1]+m[1]
            let totalA=p[3]+c[3]+m[3]
            totalMarksP=totalMarksP+p[0]
            totalMarksC=totalMarksC+c[0]
            totalMarksM=totalMarksM+m[0]
            totalAccuracyOfAllStu=totalAccuracyOfAllStu+totalC*1.0/totalA
            totalTimeOfAllStu=totalTimeOfAllStu+t[0]+t[1]+t[2]

        }
        const avgMarks=Math.round(totalMarksOfAllStu*1.0/AttemptedBy.length)
        const avgAccuracy=(totalAccuracyOfAllStu*100.0/AttemptedBy.length).toFixed(2)
        const avgTime=Math.round(totalTimeOfAllStu*1.0/AttemptedBy.length)
        const avgMP=Math.round(totalMarksP*0.1/AttemptedBy.length)
        const avgMC=Math.round(totalMarksC*0.1/AttemptedBy.length)
        const avgMM=Math.round(totalMarksM*0.1/AttemptedBy.length)
        res.push({avgMarks,avgMP,avgMC,avgMM,avgAccuracy,avgTime})

        return res
    }


    export const getUserData=(data,marks)=>{
        if(data){
            const stuAcc=(((data["phy"][1]+data["chem"][1]+data["math"][1])*100.0)/(data["phy"][3]+data["chem"][3]+data["math"][3])).toFixed(2)
            const stuMT=data["phy"][0]+data["chem"][0]+data["math"][0]
            const stuPer=(stuMT*100.0/marks).toFixed(2)
            const individualTime=data['time'][0]+data['time'][1]+data['time'][2]
            return {stuMT,stuPer,individualTime,rank:data.rank,stuAcc}
        }
        
    }



    export const UserRankAndData=(uid,AttemptedBy)=>{
        for (let i = 0; i < AttemptedBy.length; i++) {
            if(AttemptedBy[i]['uid']===uid){
                return AttemptedBy[i]
            }
        }
    }

   export function secondsToHMS(d) {
        d = Number(d)
        var h = Math.floor(d / 3600)
        var m = Math.floor(d % 3600 / 60)
        var s = Math.floor(d % 3600 % 60)
        var hDisplay = h > 0 ? h + (h == 1 ? "hr" : "hrs, ") : ''
        var mDisplay = m > 0 ? h + (m == 1 ? "min" : "mins, ") : ''
        var sDisplay = s > 0 ? h + (s == 1 ? "sec" : "secs,") : ''
    
        return hDisplay + mDisplay + sDisplay
    
      }