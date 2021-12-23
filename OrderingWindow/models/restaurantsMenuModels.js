export class Dish{
    constructor({arabicDescription,arabicName,availabilities,available,categoryIds,description,discountEndDate,discountId,discountIsAvailable,discountPercent,
        discountStartDate,favorites,id,imageUrl,isConfigurable,isSoldOut,itemExtras,name,preparationTime,price,rank}={}){
        this.arabicDescription = arabicDescription;
        this.arabicName = arabicName;
        this.availabilities= availabilities;
        this.available = available;
        this.categoryIds = categoryIds;
        this.description = description;
        this.discountEndDate= discountEndDate;
        this.discountId= discountId;
        this.discountIsAvailable=discountIsAvailable;
        this.discountPercent=discountPercent;
        this.discountStartDate = discountStartDate;
        this.favorites = favorites;
        this.id = id;
        this.imageUrl = imageUrl;
        this.isConfigurable = isConfigurable;
        this.isSoldOut = isSoldOut;
        this.itemExtras = itemExtras;
        this.name=name;
        this.preparationTime=preparationTime;
        this.price= price;

        this.rank=rank;
    }
}
export class Group{
    constructor({arabicName,availabilities,available,displayMenu,endTime,id,imageUrl,name,rank,startTime}){
        this.arabicName=arabicName;
        this.availabilities=availabilities;
        this.available=available;
        this.displayMenu=displayMenu;
        this.endTime=endTime;
        this.id=id;
        this.imageUrl=imageUrl;
        this.name=name;
        this.rank=rank;
        this.startTime=startTime;
    }
}
export class Category{
    constructor({arabicName,available,groupIds,id,maxSelectionNumber,name,rank}={}){
        this.arabicName = arabicName;
        this.available = available;
        this.groupIds = groupIds;
        this.id = id;
        this.maxSelectionNumber = maxSelectionNumber;
        this.name = name;
        this.rank = rank;
    }
}

