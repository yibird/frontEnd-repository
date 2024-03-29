## 树结构的遍历

树结构的遍历方式有两种主要类型深度优先遍历(Depth-First Traversal)、广度优先遍历(Breadth-First Traversal):

- 深度优先遍历 (Depth-First Traversal) 是一种树结构遍历的方式,常用于查找路径、计算深度、构建表达式树等问题,通常使用递归来实现,但也可以使用迭代（例如使用栈数据结构）来模拟递归。深度优先遍历遍历树结构时,它首先沿着树的深度方向尽可能远地访问节点,然后回溯到前面的节点,重复这个过程,直到遍历完整棵树。根据遍历的顺序深度优先遍历分为前序遍历、中序遍历和后序遍历:

  - 前序遍历(Preorder Traversal):首先访问根节点,然后递归地遍历左子树,最后递归地遍历右子树。在前序遍历中,根节点首先被访问,然后是左子树和右子树。
  - 中序遍历(Inorder Traversal):首先递归地遍历左子树,然后访问根节点,最后递归地遍历右子树。在中序遍历中,根节点在左子树和右子树之间被访问,因此在二叉搜索树中,中序遍历的结果是升序排列的。
  - 后序遍历(Postorder Traversal):首先递归地遍历左子树,然后递归地遍历右子树,最后访问根节点。在后序遍历中,根节点是最后被访问的。

- 广度优先遍历(Breadth-First Traversal):广度优先遍历是一种树结构遍历的方式,常用于查找最短路径、层级遍历等问题,通常使用队列数据结构来实现,以确保按照层级的顺序遍历节点。广度优先遍历树结构时,它从树的根节点开始,逐层访问每个节点,直到遍历完整棵树。广度优先遍历通常使用队列数据结构来实现,以确保按照层级的顺序遍历节点。根据遍历的顺序广度优先遍历层序遍历:
  - 广度优先遍历会按照树的层级顺序遍历节点,首先访问根节点,然后是第一层的所有节点,接着是第二层的所有节点,以此类推。
