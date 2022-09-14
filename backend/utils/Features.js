class Features {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword ? {
      name: {
        $regex: this.queryStr.keyword,
        $options: "i"
      }
    } : {

    }

    this.query = this.query.find({ ...keyword });
    //console.log(this)

    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    // Removing some field for category
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach(key => delete queryCopy[key]);

    this.query = this.query.find(queryCopy);
    return this;
  }

  pagination(pageLimit) {
    const currentPage = parseInt(this.queryStr.page) || 1;
    const startIndex = (currentPage - 1) * pageLimit;

    // 1 2 3 4 5 6 7 8 9 10

    this.query = this.query.limit(pageLimit).skip(startIndex);
    return this;
  }
}

module.exports = Features;