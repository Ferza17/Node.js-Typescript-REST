import Bootstrap from "./Bootstrap";
/*
* Notes !!!
* This split Command is use for importing data
* to elasticsearch
* */

const main = async (): Promise<void> => {
    console.log("Inserting data To Elasticsearch")
    const product = Bootstrap()
    // const isInserted: Boolean = await product.InsertToElasticSearch()
    await product.InsertToElasticSearch()
    // if (!isInserted) {
    //
    // }
}

main().then(res => {
    console.log("Success")
    process.exit(0)
}).catch(err => {
    throw new Error(err)
})

