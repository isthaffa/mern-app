const router=require("express").Router();
let Exercise=require("../models/excercise.model");

router.route('/').get((req,res)=>{
    Exercise.find()
            .then(exercises=>res.json(exercises))
            .catch(err=>res.status(400).json('error'+err))
});

router.route('/add').post((req,res)=>{
    const username=req.body.username;
    const description=req.body.description;
    const duration=Number(req.body.duration);
    const date=Date.parse(req.body.date);

    const newExercise=new Exercise({
        username,
        description,
        duration,
        date
    })

    newExercise.save()
            .then(()=>res.json('exercise added'))
            .catch(err=>res.status(400).json('error'+err))
});

router.route('/:id').get((req,res)=>{
    Exercise.findById(req.params.id)
    .then(exercise=>res.send(exercise))
    .catch(err=>res.status(400).json("error"+err))

});
router.route('/:id').delete((res,req)=>{
    Exercise.findByIdAndDelete(req.params.id)
    .then(()=>res.send("exercise delted"))
    .catch(err=>res.status(400).json('error'+err))
});


router.route('/update/:id').post((req,res)=>{
    Exercise.findById(req.params.id)
    .then(exercise=>{
        exercise.username=req.body.username,
        exercise.description=req.body.description,
        exercise.duration=Number(req.body.duration),
        exercise.date=Date.parse(req.body.date)

        exercise.save()
        .then(()=>res.send("exercise added"))
        .catch(err=>res.status(400).json('error'+err))


    })
    .catch(err=>res.status(400).json("error"+err))
})

module.exports=router;


