console.log("mesagge");
const arrDeleted = [];
let nodeToDelete = null;


class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
        this.parent = null;
        this.color = null;

    }

}

class BinarySearchTree {
    constructor(data) {
        this.root = null;

    }

    insert(data) {
        let newNode = new Node(data);

        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }


    insertNode(node, newNode) {
        if (newNode.data < node.data) {
            if (node.left === null) {
                node.left = newNode;
                node.left.parent = node;
                node.left.color = 'Rojo';

                    console.log(node.left.data + ' this happen when you add a node');  

                    this.stepOneChangeColor(node.left);

            } else {
                this.insertNode(node.left, newNode);
                
            }
            

        } else {//right

            if (node.right === null) {
                node.right = newNode;
                node.right.parent = node;
                node.right.color = 'Rojo';
                    console.log(node.right.data + ' this happen when you add a node'); 

                    this.stepOneChangeColor(node.right);

            } else {
                this.insertNode(node.right, newNode);

            }
             
        }
         
    }

    
    stepOneChangeColor (newNode){
        //buscar las condiciones ideales de inicio
        
        
     //si no hay abuelo tira un nulo 
     if (newNode.parent.parent === null) {return null} else //de lo contrario si hay abuelo
        //Si el abuelo tiene hijo derecho y si el abuelo tiene hijo izquierdo (Si hay tio)
        if ((newNode.parent.parent.left !== null) && (newNode.parent.parent.right !== null)) {
            const tio = BST.theUncle(newNode);
            console.log('El abuelo tiene hijo derecho e izquierdo, significa que hay tio');
            

        if ((newNode.color === 'Rojo') && (newNode.parent.color === 'Rojo')) {
                console.log('Tenemos dos Nodos Rojos seguidos');

                //tambien voy a comprobar si el tio es rojo
                if (tio.color === 'Rojo') {
                    console.log('tenemos al tio '+tio.data+ ' Rojo');
                    
                    //Se cambia el abuelo a Rojo, y el Padre como el hermano del Padre a Negro

                    //Se cambia el abuelo a Rojo
                    newNode.parent.parent.color = 'Rojo';
                    //y el Padre como el hermano del Padre a Negro
                    newNode.parent.color = 'Negro';
                    //Necesito crear algoritmo para saber quien es el tio (Hecho)
                    console.log('el tio es ' + tio.data + ' y lo cambio a Negro');
                    //Cambio el tio a Negro
                    tio.color = 'Negro';

                    console.log('Habian 2 nodos rojos seguidos y habia tio entonces se tranformo el abuelo a rojo y padre y el hermano del padre a negro');
                }   else {
                    console.log('el tio no es Rojo');
                }


        }
    } 

    //Que pasa si hay dos nodos Rojos (newNode y  newNode.parent) seguidos pero no hay tio
    //si hay dos nodos rojos seguidos (el nuevo nodo y su parent)
    if (newNode.color === 'Rojo' && newNode.parent.color === 'Rojo'){
        console.log('Dos Nodos Rojos seguidos, nuevo nodo y su padre (newNode y newNode.parent), voy a verificar si tiene tio');
        //Averiguo si tiene tio
        const tio = BST.theUncle(newNode);
        
        //Sino tiene tio hago esto (ESTO SUCEDE SI NO HAY TIO)
        if (tio == null) {

            //No tiene tio
            console.log(newNode.data+' No tiene tio (stepOneChangeColor)');
            console.log('Dos Nodos rojos seguidos (newNode y newNode.parent) y sin tio');

         //Esto sucede mientras que nuestro nodo Rojo esta en mismo costado del padre (padre hijo izquierdo, nuevo nodo hijo izquierdo o viceversa)
                if ((newNode.parent.left === newNode ) && (newNode.parent.parent.left === newNode.parent)) {
                    //nuestro nodo es hijo izquierdo y su papa es hijo izquierdo
                    console.log('nuestro nodo es hijo izquierdo y su papa es hijo izquierdo');
                //Al haber dos rojos sin tio, cambio al abuelo a rojo y el padre a negro
                newNode.parent.parent.color = 'Rojo';
                console.log('Se cambio el abuelo a Rojo '+newNode.parent.parent.data);
                newNode.parent.color = 'Negro';
                console.log('Se cambio el padre a Negro '+newNode.parent.data);


         //Esto sucede mientras que nuestro nodo Rojo esta en mismo costado del padre (padre hijo derecho, nuevo nodo hijo derecho o viceversa)        
            } else if ((newNode.parent.right === newNode ) && (newNode.parent.parent.right === newNode.parent)) {
                //nuestro nodo es hijo derecho y su papa es hijo derecho
                console.log('nuestro nodo es hijo derecho y su papa es hijo derecho');
                //Al haber dos rojos sin tio, cambio al abuelo a rojo y el padre a negro
                newNode.parent.parent.color = 'Rojo';
                console.log('Se cambio el abuelo a Rojo '+newNode.parent.parent.data);
                newNode.parent.color = 'Negro';
                console.log('Se cambio el padre a Negro '+newNode.parent.data);

        
        
            }

            ////////////////////////////////////////////////////////////////////////////////////////////
            //Aqui sigue sin haber tio
            //tengo que resolver porque el numero de nodos negros es el mismo en cualquier camino que vaya de la raiz a la hoja
            //en este caso el padre se mueve donde estaba el abuelo, ahora el abuelo es el hermano
            //         20               30      
            //           30     =    20    35
            //             35 
            

        }


     }
    
        //y estos dos rojos estan en el mismo costado del padre
    

    //Al final del codigo se revisa si la raiz esta en Negro sino es asi se cambia a color Negro
    if (BST.root.color !== 'Negro') {BST.root.color = 'Negro';}
    }


    //Comparo Nodo con hijo izquierdo si lo hay
    //Comparo Nodo y hijo derecho si lo hay
    inOrderComp(node) {
        if (node !== null) {
         
            if (node.left !== null) {
                console.log('node: ' + node.data);
                console.log('node left: ' + node.left.data);
            }

            if (node.right !== null) {
                console.log('node: ' + node.data);
                console.log('node right: ' + node.right.data);
            }
            this.inOrderComp(node.left);
            //do something

            console.log(node.data);
            this.inOrderComp(node.right);


        }

    }


    inOrder(node) {
        if (node !== null) {

            this.inOrder(node.left);
            //do something
            console.log(node.data);
            this.inOrder(node.right);
        }
    }

    preOrder(node) {
        if (node !== null) {
            //do something
            console.log(node.data);
            this.preOrder(node.left);
            this.preOrder(node.right);
        }
    }

    postOrder(node) {
        if (node !== null) {
            this.postOrder(node.left);
            this.postOrder(node.right);
            //do something
            console.log(node.data);
        }
    }

    searchNode(node, dataToBeFound) {

        if (node === null) { return null; }

        else if (dataToBeFound < node.data) {
            return this.searchNode(node.left, dataToBeFound);

        } else if (dataToBeFound > node.data) {
            return this.searchNode(node.right, dataToBeFound);

        } else {

            nodeToDelete = node;
            arrDeleted.length = 0;
            return node;
        }
    }

    deleteNode2(node) {


        if (node !== null) {


            this.deleteNode2(node.left);

            arrDeleted.push(node.data);
            console.log(node.data);

            this.deleteNode2(node.right);

            console.log('Nodo a Borrar ' + nodeToDelete.data);

           

            //Si el nodo a borrar es hijo izquierdo
            if (nodeToDelete.parent.left !== null) {
            if (nodeToDelete.data === node.parent.left.data) {
                nodeToDelete.parent.left = null;
                console.log('El Nodo a borrar es hijo izquierdo');

                for (let i = 0; i < arrDeleted.length; i++) {
                    if (arrDeleted[i] !== nodeToDelete.data) {
                        console.log('imprimo el array: ' + arrDeleted[i]);
                        BST.insert(arrDeleted[i]);
                    }
                }
            }
            } else {
                nodeToDelete.parent.right = null;
                console.log('El Nodo a borrar es hijo derecho');

                for (let i = 0; i < arrDeleted.length; i++) {
                    if (arrDeleted[i] !== nodeToDelete.data) {
                        console.log('imprimo el array: ' + arrDeleted[i]);
                        BST.insert(arrDeleted[i]);
                    }
                }
            }
         }
        else { console.log('termino 2'); }


    }

    //Busca el tio de un Nodo
    theUncle(node) {
        //si existe algun algun tio
        if (node === BST.root) {return console.log('es la raiz')}
        if (node.parent.parent !== null) {
        //La condicion seria si existe Hijo izquierdo y tambien hijo derecho para que haya tio
        if ((node.parent.parent.left !== null) && (node.parent.parent.right !== null)) {
            console.log('Tiene Tio');
            //Ahora verifico si nuestro nodo es hijo izquierdo o derecho
            if (node.parent.parent.left === node.parent) {

                console.log('Nuestro padre es hijo izquierdo');
                //Ahora retorno el hermano del papa (El tio del nodo)
                return node.parent.parent.right;

            } else if (node.parent.parent.right === node.parent) {

                console.log('Nuestro padre es hijo derecho');
                //Ahora retorno el hermano del papa (El tio del nodo)
                return node.parent.parent.left;
            }

        }   else {
            console.log(node.data+' No tiene tio (theUncle)');
            return null
            
            }

        } else {
            console.log(node.data+' No tiene tio (theUncle)');
            return null}
    }


}

const BST = new BinarySearchTree();
//Dos nodos rojos seguidos con tio
BST.insert(20);BST.insert(10);BST.insert(30);BST.insert(5);
//Dos nodos rojos seguidos sin tio
//BST.insert(20);BST.insert(10);BST.insert(5);
//BST.insert(20);BST.insert(30);BST.insert(35);




BST.inOrder(BST.root);

