//Creating Variables
var dog, foodS, foodStock;
var dogImg, happyDog;
var milk, milkImg;

function preload()
{
  //loading Images
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  milkImg = loadImage("images/milk.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500,500);
  
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  foodStock = database.ref('Food');
  foodStock.on('value',readStock);
 

  milk = createSprite(210,280,10,10);
  milk.addImage(milkImg);
  milk.scale = 0.025;
  milk.visible = false;

  
}


function draw() {  
  background(46,138,87);
   if (foodStock !== 0){
     if(keyWentDown(UP_ARROW)){
         writeStock(foodStock);
         dog.addImage(happyDog);
         milk.visible = true;
     }

     if(keyWentUp(UP_ARROW)){
      
       dog.addImage(dogImg);
       milk.visible = false;
     }

     if(foodStock == 0){
      dog.addImage(dogImg);
      foodStock = 20;
    }

  }

  drawSprites();
  textSize(17);
  fill("black");
  text("I am your Puppy Spot. I am very Thirsty. ",100,150);
  fill("black");
  text(" Note: Press up arrow key to feed your puppy Spot.",50,50);
  fill("black");
  text("Milk Bottles Remaining:  "+foodStock,170,440);
  

}

function readStock(data)
{
  foodStock = data.val();
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }else{
    x=x-1
  }

  database.ref('/').update({
    Food:x
  })
}



