const {
    Stitch,
    RemoteMongoClient,
    AnonymousCredential,
    UserPasswordCredential,
} = require('mongodb-stitch-server-sdk');

const client = Stitch.initializeDefaultAppClient('board001-jexly');

const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('test');

/*client.auth
    .loginWithCredential(new UserPasswordCredential('test001', 'ka1114'))
    .then(() => db.collection('dfsadfsdfsdf').find({}, {}).asArray()
).then(docs => {
    console.log("Found docs", docs)
    console.log("[MongoDB Stitch] Connected to Stitch")
}).catch(err => {
    console.error(err)
});*/


client.auth.loginWithCredential(new UserPasswordCredential('test001', 'ka1114')).then(user =>
    db.collection('dfsadfsdfsdf').updateOne({owner_id: client.auth.user.id}, {$set:{number:42}}, {upsert:true})
).then(() =>
    db.collection('dfsadfsdfsdf').find({owner_id: client.auth.user.id}, { limit: 100}).asArray()
).then(docs => {
    console.log("Found docs", docs)
    console.log("[MongoDB Stitch] Connected to Stitch")
}).catch(err => {
    console.error(err)
});
