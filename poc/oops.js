
class LivingOrganisms{
    LivingOrganisms()
    {
        this.breaths=true;
    }
  
    isBreathing()
    {
        console.log(this.breaths);
    }
}

class Bird extends LivingOrganisms{
    Bird()
    {
        super();
        this.eats=true;
    }

    printHabit()
    {
        console.log(this.eats);
    }
}

class Penguin extends Bird
{
    Penguin()
    {
        super(); //used to run the contructor of parent
        this.habitat="Antartica";
    }
    printPlaceOfOrigin()
    {
        console.log(this.habitat);
    }
}

const myPenguin=new Penguin();
myPenguin.printPlaceOfOrigin();
myPenguin.printHabit();

//error -> Must call super contructor in derived class before accessing this or returning from derived contructor

class Bird {
    
    eats=true;
    

    printHabit=()=>
    {
        console.log(this.eats);
    }
}

class Penguin extends Bird //new syntax
{
    habitat="Antartica";
    
    printPlaceOfOrigin=()=>
    {
        console.log(this.habitat);
    }
}

const myPenguin1=new Penguin();
myPenguin.printPlaceOfOrigin();
myPenguin.printHabit();