//Create variables here
var dog, dogImg, happyDodImg, database, foods, foodstock;
var feed, addFood,fedTime,lastFed,foodObj;

function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg1.png");
  happyDog = loadImage("images/dogImg.png");
}


function setup() {  
  database = firebase.database();
createCanvas(1000,500);


foodObj = new Food();

dog = createSprite(800,220,150,150);
dog.addImage(dogImg1);
dog.scale = 0.15;

feed = createSprite("Feed the Dog")
feed.position(700,95);
feed.mousePressed(feedDog);

addFood = createButton("Add Food")
addFood.position(800,95);
addFood.mousePressed(addfoods);
  
}
function draw() {
  background(46,139,87);

  //add styles here

  fedTime = database.ref("FeedTime");
  fedTime.on("value",function(data){
  lastFed = data.val();
  })
  fill(255);
  textSize(20);
  if(lastFed>=12){
    text("Last Feed : ",+ lastFeed% 12+ "PM,350,30");
  }
  else if(lastFed==0){
    text("last Feed : 12 AM",350,30);
  }
  else{
    text("last Feed : "+lastFed +"AM",350,30);
  }

  foodObj.display();
  drawSprites();
}
 
function readStock(data){
  foods = data.val();
  foodObj.updateFoodStock(foods);
}

function feedDog(){
dog.addImage(happyDog);
foodObj.updateFoodStock(foodObj.getFoodStock()-1)
database.ref('/').update({
  Food: foodObj.getFoodStock(),
  FeedTime: hour()
})

}

function addFoods(){
  foods++;
  database.ref('/').update({
    Food: foods
  })
}