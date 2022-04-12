class TreeNode{
    constructor(val){
        this.val=val;
        this.descendants = [];
    }
}

// rootnode 
const tmp = new TreeNode("main");
const root = tmp;

root.descendants.push(new TreeNode("1- option_1 "));
root.descendants.push(new TreeNode("2- option_2 "));
root.descendants.push(new TreeNode("3- option_3 "));

root.descendants[0].descendants.push(new TreeNode("1- 1-option 1.1"));
root.descendants[0].descendants.push(new TreeNode("1- 2-option 1.2"));

root.descendants[2].descendants.push(new TreeNode("3- 1-option 1.1"));
root.descendants[2].descendants.push(new TreeNode("3- 2-option 1.2"));
root.descendants[2].descendants.push(new TreeNode("3- 3-option 1.3"));
root.descendants[2].descendants.push(new TreeNode("3- 4-option 1.4"));

console.log(root.descendants.length);
//console.log('before tmp ',tmp);

//console.log('after tmp ',tmp);

module.exports = tmp;
