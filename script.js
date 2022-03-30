var arrSize = document.getElementById("arrayRange");
var arrlength = arrSize.value;
var container = document.querySelector(".array");
var generate_new = document.querySelector(".new-array");
var inp_aspeed = document.getElementById("myRange");
var title = document.querySelector(".title");
var describe = document.querySelector(".about");
var block_sizes=[];
var blocks=[];

make_array(arrlength);
console.log("hi");
function make_array(arrlength){
    block_sizes=[];
    blocks=[];
    container.innerHTML="";
    for(var i=0;i<arrlength;i++){
        block_sizes[i] = Math.floor(Math.random() * 0.5*(arrSize.max - arrSize.min))+10;
        blocks[i] = document.createElement("div");        
        var width = (950-(arrlength-1)*0.5)/arrlength;
        blocks[i].classList.add("bar");
        blocks[i].style="width:"+ width +"px"+";margin:"+ "0 0.5px" +";background-color: blue"+";height: "+block_sizes[i]+"%" +";top:"+(420-(4.2*block_sizes[i]))+"px;transition:all 0.2s ease;";

        container.appendChild(blocks[i]);
    }
    console.log(blocks);
}


arrSize.addEventListener("input",update_array);
generate_new.addEventListener("click",update_array);

function update_array(){
    arrlength = arrSize.value;
    make_array(arrlength);
}



//___________________vizualize_____________________

var speed=300;

inp_aspeed.addEventListener("input",vis_speed);

var delay_time = 100000/(Math.floor(arrlength/10)*speed);

function vis_speed()
{
    var array_speed=inp_aspeed.value;
    switch(parseInt(array_speed))
    {
        case 1: speed=10;
                break;
        case 2: speed=100;
                break;
        case 3: speed=200;
                break;
        case 4: speed=300;
                break;
        case 5: speed=500;
                break;
    }
    console.log(speed);
    delay_time=10000/(Math.floor(arrlength/10)*speed);        //Decrease numerator to increase speed.
}
var d_delay = 0;

function delay(name, height, color){
    setTimeout(() => {
        name.style.height = height+"%";
        name.style.top = (420-(4.2*height))+"px";
        name.style.backgroundColor = color;       
    }, d_delay+=delay_time);
}



var buttons = document.querySelectorAll("button");


//_________________bubble sort________________________

function bubble_sort(){
    title.textContent = "Bubble Sort";
    describe.innerHTML = "Yellow-iterate the array. Red-comparing and swapping. Green-final positions";
    for(var i=0;i<arrlength-1;i++){
        for(var j=0;j<arrlength-i-1;j++){

            delay(blocks[j],block_sizes[j],"yellow");

            if(block_sizes[j]>block_sizes[j+1]){
                var temp = block_sizes[j];
                block_sizes[j] = block_sizes[j+1];
                block_sizes[j+1] = temp;

                delay(blocks[j],block_sizes[j],"red");
                
                delay(blocks[j+1],block_sizes[j+1],"red");
            }

            delay(blocks[j],block_sizes[j],"blue");
        }
        delay(blocks[j],block_sizes[j],"green");
    delay(blocks[0],block_sizes[0],"green");
    }


    d_delay=0;
}


//insertion sort

function insertion_sort(){
    title.textContent = "Insertion Sort";
    //describe.textContent = "Yellow-iterate the array. Red-comparing and swapping. Blue-partially sorted. Green-final positions";
    describe.innerHTML = "Yellow-iterate the array. Red-comparing and swapping. Blue-partially sorted. Green-final positions ";
    let i, key, j; 
    for (i = 1; i < arrlength; i++)
    { 
        key = block_sizes[i]; 
        j = i - 1; 
        
        delay(blocks[i],block_sizes[i],"yellow");

        while (j >= 0 && block_sizes[j] > key)
        { 
            delay(blocks[j],block_sizes[j],"red");

            block_sizes[j + 1] = block_sizes[j]; 

            delay(blocks[j+1],block_sizes[j+1],"red");

            delay(blocks[j],block_sizes[j],"#005792");

            delay(blocks[j+1],block_sizes[j+1],"#005792");

            j = j - 1; 

        } 
        block_sizes[j + 1] = key; 
        delay(blocks[j+1],block_sizes[j+1],"blue");

        for(var x=j;x<i;x++){
            delay(blocks[x],block_sizes[x],"green");
        }

    } 
    delay(blocks[arrlength-1],block_sizes[arrlength-1],"green");
    d_delay=0;
}


//selection sort
function selectionSort() { 
    title.textContent = "Selection Sort";
    describe.innerHTML = "Yellow-iterating. Red-comparing and swapping. Black-getting the next smallest element. Green-final position ";

    for(let i = 0; i < arrlength; i++) {

        delay(blocks[i],block_sizes[i],"red");

        let min = i;
        for(let j = i+1; j < arrlength; j++){
            delay(blocks[j],block_sizes[j],"yellow");
            if(block_sizes[j] < block_sizes[min]) {
                if(min!=i) delay(blocks[min],block_sizes[min],"blue");
                min=j; 
                delay(blocks[min],block_sizes[min],"black");
            }
            else delay(blocks[j],block_sizes[j],"blue");
        }
         if (min != i) {
            // Swapping the elements
            delay(blocks[i],block_sizes[i],"red");
            delay(blocks[min],block_sizes[min],"red");

            let tmp = block_sizes[i]; 
            block_sizes[i] = block_sizes[min];
            block_sizes[min] = tmp; 

            delay(blocks[i],block_sizes[i],"red");
            delay(blocks[min],block_sizes[min],"red");
        }
        delay(blocks[i],block_sizes[i],"blue");
        delay(blocks[min],block_sizes[min],"blue");

        delay(blocks[i],block_sizes[i],"green");
    }
    d_delay=0;
}


//merge sort
function Merge()
{
    title.textContent = "Merge Sort";
    describe.innerHTML = "Yellow-scanning through two sorted partitions. Green-final positions. Red-indicates partitioning ";
    d_delay=0;

    merge_partition(0,arrlength-1);

    //enable_buttons();
}

function merge_sort(start,mid,end)
{
    var p=start,q=mid+1;

    var Arr=[],k=0;

    for(var i=start; i<=end; i++)
    {
        if(p>mid)
        {
            Arr[k++]=block_sizes[q++];
            delay(blocks[q-1],block_sizes[q-1],"yellow");//Color update
        }
        else if(q>end)
        {
            Arr[k++]=block_sizes[p++];
            delay(blocks[p-1],block_sizes[p-1],"yellow");//Color update
        }
        else if(block_sizes[p]<block_sizes[q])
        {
            Arr[k++]=block_sizes[p++];
            delay(blocks[p-1],block_sizes[p-1],"yellow");//Color update
        }
        else
        {
            Arr[k++]=block_sizes[q++];
            delay(blocks[q-1],block_sizes[q-1],"yellow");//Color update
        }
    }

    for(var t=0;t<k;t++)
    {
        block_sizes[start++]=Arr[t];
        delay(blocks[start-1],block_sizes[start-1],"green");//Color update
    }
}

function merge_partition(start,end)
{
    if(start < end)
    {
        var mid=Math.floor((start + end) / 2);
        delay(blocks[mid],block_sizes[mid],"red");//Color update

        merge_partition(start,mid);
        merge_partition(mid+1,end);

        merge_sort(start,mid,end);
    }
}


//quick sort

function Quick()
{
    title.textContent = "Quick Sort";
    describe.innerHTML = "functioning-It takes a element as pivot and brings the elements that are smaller than pivot to one side and greater than pivot to other side and this operation goes on the small parts of array";
    c_delay=0;

    quick_sort(0,arrlength-1);

}

function quick_partition (start, end)
{
    var i = start + 1;
    var piv = block_sizes[start] ;//make the first element as pivot element.
    delay(blocks[start],block_sizes[start],"yellow");//Color update

    for(var j =start + 1; j <= end ; j++ )
    {
        //re-arrange the array by putting elements which are less than pivot on one side and which are greater that on other.
        if (block_sizes[ j ] < piv)
        {
            delay(blocks[j],block_sizes[j],"yellow");//Color update

            delay(blocks[i],block_sizes[i],"red");//Color update
            delay(blocks[j],block_sizes[j],"red");//Color update

            var temp=block_sizes[i];
            block_sizes[i]=block_sizes[j];
            block_sizes[j]=temp;

            delay(blocks[i],block_sizes[i],"red");//Height update
            delay(blocks[j],block_sizes[j],"red");//Height update

            delay(blocks[i],block_sizes[i],"blue");//Height update
            delay(blocks[j],block_sizes[j],"blue");//Height update

            i += 1;
        }
    }
    delay(blocks[start],block_sizes[start],"red");//Color update
    delay(blocks[i-1],block_sizes[i-1],"red");//Color update
    
    var temp=block_sizes[start];//put the pivot element in its proper place.
    block_sizes[start]=block_sizes[i-1];
    block_sizes[i-1]=temp;

    delay(blocks[start],block_sizes[start],"red");//Height update
    delay(blocks[i-1],block_sizes[i-1],"red");//Height update

    for(var t=start;t<=i;t++)
    {
        delay(blocks[t],block_sizes[t],"green");//Color update
    }

    return i-1;//return the position of the pivot
}

function quick_sort (start, end )
{
    if( start < end )
    {
        //stores the position of pivot element
        var piv_pos = quick_partition (start, end ) ;     
        quick_sort (start, piv_pos -1);//sorts the left side of pivot.
        quick_sort (piv_pos +1, end) ;//sorts the right side of pivot.
    }
 }









