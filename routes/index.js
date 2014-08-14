

var
fs      = require('fs'),
file    = 'todo.json',
path    = 'data/',
todoList;

var returnJsonData = function(){
    fs.readFile(path + file,'utf8', function (err,data) {
        if(err){
            return console.log(err);
        }
        if(data.length > 0){
             todoList =  JSON.parse(data);
             console.log('returnJsonData: ',todoList);
        } else {
            console.log('file is empty');
            var emptyArr = [];
            fs.writeFile(path + file,JSON.stringify(emptyArr,null,4),function(err){
                if(err){
                    console.log('file did not write');
                } else {
                    console.log('empty array added');
                }
            });
        }


    });
};

fs.exists(path + file, function (exists) {
    console.log(exists);
        if(exists){
            returnJsonData();
        } else {
            console.log('File does not exist');
        }
});


//Received data from todo list
exports.receiveData = function (req, res) {
    console.log('received');
    var currentItems;
    var newItems;
    //Get data from post
    writeTodo(req.param('list'),req, res);

    console.log(req.param('list'));
    // Read current JSON

};


function writeTodo(obj,req, res){
    fs.writeFile(path + file,JSON.stringify(obj,null,4),function(err){
        if(err){
            console.log('file did not write');
        } else {
            todoList = obj;
            console.log('success');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify( { status: 'OK',todo : obj } ));
            console.log(obj);
            res.end();
        }
    });
}
exports.getData = function(req,res){
    // Send data to Backbone
    if(typeof todoList !== 'undefined' ){
        res.send(todoList);
        console.log('sending: ',todoList);
    } else {
        res.send('list empty');
    }
};

