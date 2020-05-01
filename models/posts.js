var posts=[{
    id : 1,
    href : "/post/1",
    title : "SYN Flood attacks!",
    tags : ['TCP', 'handshake', 'SYN'],
    content : "Shoot many SYN messages to set up flood of TCP connections to a server!\n The server will crash!!",
    rating : 5,
    comments : ["Mate, what are the ways to build a server that avoids this attack?"]
},
{   id : 2,
    href : "/post/2",
    title : "Do not use Telnet!",
    tags : ['ssh', 'Telnet', 'scp'],
    content : "Telnet will expose everything from you...",
    rating : 5,
    comments : ["Shall we use SSH instead?"]
}];

module.exports = posts;