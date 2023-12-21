
class ResultMethods{

     getAvgMarks=(AttemptedBy)=>{
        
        let totalMarksOfAllStu=0
        let totalTimeOfAllStu=0
        let totalAccuracyOfAllStu=0
        let totalMarksP=0
        let totalMarksC=0
        let totalMarksM=0 

        for (let i = 0; i < AttemptedBy.length; i++) {
            const userData = AttemptedBy[i];
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
        const avgMarks=totalMarksOfAllStu*1.0/AttemptedBy.length
        const avgAccuracy=totalAccuracyOfAllStu*1.0/AttemptedBy.length
        const avgTime=totalTimeOfAllStu*1.0/AttemptedBy.length
        const avgMP=totalMarksP*0.1/AttemptedBy.length
        const avgMC=totalMarksC*0.1/AttemptedBy.length
        const avgMM=totalMarksM*0.1/AttemptedBy.length

        return {avgMarks,avgMP,avgMC,avgMM,avgAccuracy,avgTime}
    }

}