class APIHelper{
    constructor(query,queryStr){
        this.query=query;   //MongoDB Query
        this.queryStr=queryStr;   //Query String from URL
    };
    search(){
        const keyWord=this.queryStr.keyword?{
            name:{
                $regex:this.queryStr.keyword, //regular expression
                $options:"i", //case insensitive
            },
        } 
        :{};
        this.query=this.query.find({...keyWord});
        return this;
    };
    filter(){
        const queryCopy={...this.queryStr};
        const removeFields=["keyword","page","limit"];
        removeFields.forEach((key)=>delete queryCopy[key]);
        this.query=this.query.find(queryCopy);
        return this;
    };
    pagination(resultPerPage){
        const currentPage=Number(this.queryStr.page) || 1;
        const skip=resultPerPage*(currentPage-1);
        this.query=this.query.limit(resultPerPage).skip(skip);
        return this;

    }
};

export default APIHelper;