
const express = require("express")
const bodyParser=require("body-parser")
const request=require("request");
const { response } = require("express");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.post("/",(req,res)=>{
    
    var fname=req.body.fname;
    var lname=req.body.lname;
    var mail=req.body.mail;

    var data={
        members:[
            {
                email_address:mail,
                status:"subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                },
            }
        ],
        update_existing: true,
    };

    jsondata=JSON.stringify(data);

    var option={
        url: "https://us12.api.mailchimp.com/3.0/lists/e6592adb06",
        method:"POST",
        headers:{
            "Authorization": " me1 6626c87be42e67147fda0a7972e984b7-us12"
        },
        body:jsondata
    };

    request(option,(error,response,body)=>{

        if(error){
            res.sendFile(__dirname+"/error.html");
        }else{
            console.log(JSON.parse(body).errors)
            bdy=JSON.parse(body)
            if(response.statusCode===200 && bdy.error_count===0){
                res.sendFile(__dirname+"/success.html")
            }else{
            res.sendFile(__dirname + "/error.html");}

        }
    });


});

app.post("/failure",(req,res)=>{
    res.redirect("/");
})


app.listen(process.env.PORT || 3000,function(){
    console.log("listening on 3000");
})
