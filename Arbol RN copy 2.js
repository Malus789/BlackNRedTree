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
            newNode.color = 'Negro';
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


    stepOneChangeColor(newNode) {
        //buscar las condiciones ideales de inicio


        //si no hay abuelo tira un nulo 
        if (newNode.parent.parent === null) { return null } else //de lo contrario si hay abuelo
            //Si el abuelo tiene hijo derecho y si el abuelo tiene hijo izquierdo (Si hay tio)
            if ((newNode.parent.parent.left !== null) && (newNode.parent.parent.right !== null)) {
                const tio = BST.theUncle(newNode);
                console.log('El abuelo tiene hijo derecho e izquierdo, significa que hay tio');


                if ((newNode.color === 'Rojo') && (newNode.parent.color === 'Rojo')) {
                    console.log('Tenemos dos Nodos Rojos seguidos');

                    //tambien voy a comprobar si el tio es rojo
                    if (tio.color === 'Rojo') {
                        console.log('tenemos al tio ' + tio.data + ' Rojo');

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
                    } else {
                        console.log('el tio no es Rojo');
                    }


                }
            }

        //Que pasa si hay dos nodos Rojos (newNode y  newNode.parent) seguidos pero no hay tio
        //si hay dos nodos rojos seguidos (el nuevo nodo y su parent)
        if (newNode.color === 'Rojo' && newNode.parent.color === 'Rojo') {
            console.log('Dos Nodos Rojos seguidos, nuevo nodo y su padre (newNode y newNode.parent), voy a verificar si tiene tio');
            //Averiguo si tiene tio
            const tio = BST.theUncle(newNode);

            //Sino tiene tio hago esto (ESTO SUCEDE SI NO HAY TIO)
            if (tio == null) {

                //No tiene tio
                console.log(newNode.data + ' No tiene tio (stepOneChangeColor)');
                console.log('Dos Nodos rojos seguidos (newNode y newNode.parent) y sin tio');

                //Esto sucede mientras que nuestro nodo Rojo esta en mismo costado del padre (padre hijo izquierdo, nuevo nodo hijo izquierdo o viceversa)
                if ((newNode.parent.left === newNode) && (newNode.parent.parent.left === newNode.parent)) {
                    //nuestro nodo es hijo izquierdo y su papa es hijo izquierdo
                    console.log('nuestro nodo es hijo izquierdo y su papa es hijo izquierdo');
                    //Al haber dos rojos sin tio, cambio al abuelo a rojo y el padre a negro

                    /*
                    newNode.parent.parent.color = 'Rojo';
                    console.log('Se cambio el abuelo a Rojo ' + newNode.parent.parent.data);
                    newNode.parent.color = 'Negro';
                    console.log('Se cambio el padre a Negro ' + newNode.parent.data);*/
                    //Giramos a la derecha por el abuelo

                    this.caseOne(newNode);


                    //Esto sucede mientras que nuestro nodo Rojo esta en mismo costado del padre (padre hijo derecho, nuevo nodo hijo derecho o viceversa)        
                } else if ((newNode.parent.right === newNode) && (newNode.parent.parent.right === newNode.parent)) {
                  /*  //nuestro nodo es hijo derecho y su papa es hijo derecho
                    console.log('nuestro nodo es hijo derecho y su papa es hijo derecho');
                    //Al haber dos rojos sin tio, cambio al abuelo a rojo y el padre a negro
                    newNode.parent.parent.color = 'Rojo';
                    console.log('Se cambio el abuelo a Rojo ' + newNode.parent.parent.data);
                    newNode.parent.color = 'Negro';
                    console.log('Se cambio el padre a Negro ' + newNode.parent.data);*/
                    //Giramos a la izquierda por el abuelo

                    this.caseOne(newNode);



                }

                

            } else {

            ////////////////////////////////////////////////////////////////////////////////////////////
                //Aqui sigue sin haber tio
                //tengo que resolver porque el numero de nodos negros es el mismo en cualquier camino que vaya de la raiz a la hoja
                //en este caso el padre se mueve donde estaba el abuelo, ahora el abuelo es el hermano
                //         20               30      
                //           30     =    20    35
                //             35 


                console.log('en esta condicion hay dos nodos rojos seguidos y hay tio pero negro');

                //bajo que condicion giramos a la izquierda o a la derecha

                //En este Caso tenemos a padre Rojo y tio negro, ademas nuestro (nodo es hijo derecho y su padre hijo izquierdo del abuelo)
                if (this.theUncle(newNode).color === 'Negro' ) {console.log('el tio es negro segunda comprobacion');

                    //comprobamos si somos hijo derecho y si nuestro padre es hijo izquierdo
                    if ((newNode === newNode.parent.right) && (newNode.parent === newNode.parent.parent.left)){
                        console.log('nodo es hijo derecho y su padre hijo izquierdo del abuelo ( y tio negro), GIRAMOS A LA IZQUIERDA');
                        this.caseTwo(newNode,'left');


                        } else {}   


                    //comprobamos si somos hijo izquierdo de nuestro padre, y nuestro padre rojo (en este punto nuestro tio fijo es negro)
                        //de ser asi rotamos a la derecha por el abuelo
                        //se llama a caso 3, lo que hace es mover nuestro abuelo a la derecha, nuestro padre ocupa el lugar de nuestro abuelo
                        //y nuestro nodo se mueve a donde estaba nuestro padre           
                //seguimos con tio negro
                    if ((newNode === newNode.parent.left) && (newNode.parent === newNode.parent.parent.left)){

                        console.log('comprobamos y nuestro nodo: '+newNode.data+' es hijo izquierdo, y el papa tambien es hijo izquierdo');
                        this.case3(newNode);

                    }
                }
                

            }


            //Ahora que sucede

        }

        //y estos dos rojos estan en el mismo costado del padre


        //Al final del codigo se revisa si la raiz esta en Negro sino es asi se cambia a color Negro
        if (BST.root.color !== 'Negro') { BST.root.color = 'Negro'; }
    }

    caseOne(node){
        //En esta condicion no tenemos tio y hay dos nodos rojos seguidos, entonces hacemos los giros por el abuelo
        if ((node.parent.left === node) && (node.parent.parent.left === node.parent)) {
            console.log('nodo y su padre rojo, sin tio, padre e hijo hijos izquierdos, GIRAMOS A LA DERECHA');

    
            //voy a crear un nuevo nodo con la informacion del abuelo
            let newNode = new Node(node.parent.parent.data)
    
            newNode.color = 'Rojo';

            newNode.parent = node.parent.parent;
            
            node.parent.parent.right = newNode;
            //rotamos a la derecha
    
            //ahora donde estaba nuestro abuelo lo cambiamos por el de nuestro padre
            node.parent.parent.data = node.parent.data;
    
            //donde estaba nuestro padre va la data de nuestro nodo
            node.parent.data = node.data;

            //Tengo que buscar una solucion para hacer con el left
            node.parent.left = null;
    
            //COLOREAMOS AL PADRE DE NEGRO Y AL ABUELO DE ROJO
            newNode.parent.color = 'Negro';

            console.log('Se hizo el giro a la derecha por el abuelo');


        } else {
            console.log('nodo y su padre rojo, sin tio, padre e hijo hijos derechos, GIRAMOS A LA IZQUIERDA');
            //voy a crear un nuevo nodo con la informacion del abuelo
            let newNode = new Node(node.parent.parent.data)
    
            newNode.color = 'Rojo';

            newNode.parent = node.parent.parent;
            
            node.parent.parent.left = newNode;
            //rotamos a la derecha
    
            //ahora donde estaba nuestro abuelo lo cambiamos por el de nuestro padre
            node.parent.parent.data = node.parent.data;
    
            //donde estaba nuestro padre va la data de nuestro nodo
            node.parent.data = node.data;

            //Tengo que buscar una solucion para hacer con el left
            node.parent.right = null;
    
            //COLOREAMOS AL PADRE DE NEGRO Y AL ABUELO DE ROJO
            newNode.parent.color = 'Negro';

            console.log('Se hizo el giro a la izquierda por el abuelo');

        }


    }

    caseOneB(node, rotemos){
        //En esta condicion hacemos los giros por el abuelo arrastrando todo lo demas
        if (rotemos === 'right') {
            console.log('iniciamos codigo para gira a la derecha');
            //voy a crear un nuevo nodo con la informacion del abuelo
            let newNode = new Node(node.parent.parent.data)

            //Nuevo Nodo a la derecha del abuelo asignado
            newNode.color = 'Rojo';
            newNode.right = node.parent.parent.right;
            newNode.right.parent = newNode;
            newNode.left = node.parent.right;
            newNode.left.parent = newNode;
            newNode.parent = node.parent.parent;
            node.parent.parent.right = newNode;

            //cambio la data del abuelo a la del padre            
            node.parent.parent.data = node.parent.data;
            //cambio la data del padre a la del nodo
            node.parent.data = node.data;
            node.parent.left = node.left;
            node.parent.right = node.right;


            console.log('Se hizo el giro a la derecha por el abuelo');}
            
            else if (rotemos === 'left') {

            console.log('iniciamos codigo para gira a la izquierda');
            //voy a crear un nuevo nodo con la informacion del abuelo
            let newNode = new Node(node.parent.parent.data)

            //Nuevo Nodo a la derecha del abuelo asignado
            newNode.color = 'Rojo';
            newNode.left = node.parent.parent.left;
            newNode.left.parent = newNode;
            newNode.right = node.parent.left;
            newNode.right.parent = newNode;
            newNode.parent = node.parent.parent;
            node.parent.parent.left = newNode;

            //cambio la data del abuelo a la del padre            
            node.parent.parent.data = node.parent.data;
            //cambio la data del padre a la del nodo
            node.parent.data = node.data;
            node.parent.right = node.right;
            node.parent.left = node.left;

            console.log('Se hizo el giro a la izquierda por el abuelo');
        
        
        
        }
     
            

    }


    caseTwo(node, rotemos){
        //las condiciones se definen antes de ejecutar este codigo
        if (rotemos === 'left') {
            console.log('iniciamos codigo para gira a la izquierda');
            //si el parametro es left entonces rotamos a la izquierda

        //En este Caso tenemos a padre Rojo y tio negro, ademas nuestro (nodo es hijo derecho y su padre hijo izquierdo del abuelo)
            //lo que hacemos es que N (nuestro nodo) toma la posicion que tenia su Padre y su padre ahora es hijo izquierdo del abuelo
            let auxNode = null;
            
            //guardo en auxNode(nodo auxiliar) los datos del padre del Nodo
            auxNode = node.parent.data;
            //reemplazo los datos del padre por el de nuestro nodo
            node.parent.data = node.data;
           
        //esta parte se esta haciendo en el caso que rotemos a la izquierda
            //aqui es donde tengo que asignar un nodo a la izquierda del padre
                //sino existe nodo se crea
            if (node.parent.left === null) {
                console.log('No habia nodo a la izquierda entonces creamos uno nuevo')
                let newNode = new Node(auxNode);

                newNode.color = 'Rojo';
                newNode.parent = node.parent;
                //creamos un nodo a la izquierda con los datos del padre (nodo auxiliar)
                node.parent.left = newNode;

                console.log('movimos al padre a la izquierda');

            }

            //Borramos nuestro nodo porque ya lo pasamos a la posicion del padre
            //aunque deberiamos detectar si se borra o se le asigna a otro
            node.parent.right = null;

            this.case3(node.parent.left);
            
            

        } else if (rotemos === 'right') {

            //si el parametro es right giramos a la derecha


        //En este Caso tenemos a padre Rojo y tio negro, ademas nuestro (nodo es hijo derecho y su padre hijo izquierdo del abuelo)
            //lo que hacemos es que N (nuestro nodo) toma la posicion que tenia su Padre y su padre ahora es hijo izquierdo del abuelo
            let auxNode = null;
            
            //guardo en auxNode(nodo auxiliar) los datos del padre del Nodo
            auxNode = node.parent.data;
            //reemplazo los datos del padre por el de nuestro nodo
            node.parent.data = auxNode;
           
        //esta parte se esta haciendo en el caso que rotemos a la izquierda
            //aqui es donde tengo que asignar un nodo a la izquierda del padre
                //sino existe nodo se crea
            if (node.parent.right === null) {
                console.log('No habia nodo a la derecha entonces creamos uno nuevo')
                let newNode = new Node(auxNode);

                newNode.color = 'Rojo';
                //creamos un nodo a la izquierda con los datos del padre (nodo auxiliar)
                node.parent.right = newNode;

                console.log('movimos al padre a la derecha');

            }

            //Borramos nuestro nodo porque ya lo pasamos a la posicion del padre
            //aunque deberiamos detectar si se borra o se le asigna a otro
            newNode.parent.left = null;

            this.case3(node.parent.right);
        }

        

    }


    caseTwoB(node, rotemos){
        //ocupo mejorar para que gira llevando los nodos que tienen en lados correspondientes
        //las condiciones se definen antes de ejecutar este codigo
        if (rotemos === 'left') {
            console.log('iniciamos codigo para gira a la izquierda');
            //si el parametro es left entonces rotamos a la izquierda por el Padre


            let auxNode = null;
            //Saco respaldo de los datos del padre
            auxNode = node.parent.data;
            let newNode = new Node(auxNode);
            //Nuevo Nodo con los datos del papa
            newNode.color = 'Rojo';
            node.parent.left.parent = newNode;
            newNode.left = node.parent.left;
            
            newNode.parent = node.parent;
            node.parent.left = newNode;

            node.parent.data = node.data;

            
            newNode.right = node.left;
            node.left.parent = newNode;

            node.parent.right = node.right;


        

           // this.case3(node.parent.left);
            
            

        } else if (rotemos === 'right') {

            //si el parametro es right giramos a la derecha


            let auxNode = null;
            //Saco respaldo de los datos del padre
            auxNode = node.parent.data;
            let newNode = new Node(auxNode);
            //Nuevo Nodo con los datos del papa

            node.parent.right.parent = newNode;
            newNode.right = node.parent.right;
            
            newNode.parent = node.parent;
            node.parent.right = newNode;

            node.parent.data = node.data;

            
            newNode.left = node.right;
            node.right.parent = newNode;

            node.parent.left = node.left;

            

        }

        

    }

    case3(node){
        //En este caso entramos con la condicion de ser un nodo hijo izquierdo, y nuestro padre hijo izquierdo 
        //se llama a caso 3, lo que hace es mover nuestro abuelo a la derecha, nuestro padre ocupa el lugar de nuestro abuelo
                        //y nuestro nodo se mueve a donde estaba nuestro padre           
                //seguimos con tio negro

            //Este giro a la derecha es porque somos hijo izquierdo y nuestro padre es izquierdo

            if ((node.parent.left === node) && (node.parent.parent.left === node.parent)) {

        let tio = this.theUncle(node);
        
        console.log('Nuestro tio '+tio.data+' es negro y vamos a empezar el caso 3');

        //voy a crear un nuevo nodo con la informacion del abuelo
        let newNode = new Node(node.parent.parent.data)
        //respaldamos a la data de tio
        let nodeBackup = tio.left;

        newNode.color = 'Rojo';
        newNode.right = tio;
        newNode.parent = node.parent.parent;
        tio.parent = newNode;
        
        node.parent.parent.right = newNode;
        //rotamos a la derecha

        //ahora donde estaba nuestro abuelo lo cambiamos por el de nuestro padre
        node.parent.parent.data = node.parent.data;

        //donde estaba nuestro padre va la data de nuestro nodo
        node.parent.data = node.data;

        //COLOREAMOS AL PADRE DE NEGRO Y AL ABUELO DE ROJO
        newNode.parent.color = 'Negro';

        //a la derecha de nuestro tio tiene que ir nuestro antiguo tio junto con todos sus nodos ??????????????????????????????????????????????????????????????????????????????????????? 

        console.log('valor del tio por el del abuelo, nuestro abuelo lo cambiamos por el de nuestro padre, donde estaba nuestro padre va la data de nuestro nodo ');
        //comprobamos donde esta la raiz
        if (node.parent.parent === this.root) {
            console.log('Nuestro abuelo era la raiz');
    
    
    
         }

        } else {


        let tio = this.theUncle(node);
        
        console.log('Nuestro tio '+tio.data+' es negro y vamos a empezar el caso 3');

        //voy a crear un nuevo nodo con la informacion del abuelo
        let newNode = new Node(node.parent.parent.data)
        //respaldamos a la data de tio
        let nodeBackup = tio.left;

        newNode.color = 'Rojo';
        newNode.left = tio;
        newNode.parent = node.parent.parent;
        tio.parent = newNode;
        
        node.parent.parent.left = newNode;
        //rotamos a la derecha

        //ahora donde estaba nuestro abuelo lo cambiamos por el de nuestro padre
        node.parent.parent.data = node.parent.data;

        //donde estaba nuestro padre va la data de nuestro nodo
        node.parent.data = node.data;

        //COLOREAMOS AL PADRE DE NEGRO Y AL ABUELO DE ROJO
        newNode.parent.color = 'Negro';

        //a la derecha de nuestro tio tiene que ir nuestro antiguo tio junto con todos sus nodos ??????????????????????????????????????????????????????????????????????????????????????? 

        console.log('valor del tio por el del abuelo, nuestro abuelo lo cambiamos por el de nuestro padre, donde estaba nuestro padre va la data de nuestro nodo ');
        //comprobamos donde esta la raiz
        if (node.parent.parent === this.root) {
            console.log('Nuestro abuelo era la raiz');
    
    
    
         }

      }


    }
        
    


    //Comparo Nodo con hijo izquierdo si lo hay
    //Comparo Nodo y hijo derecho si lo hay
    inOrderComp(node) {
        if (node !== null) {

            if (node.left !== null) {
                console.log('node: ' + node.data);
                console.log('node left: ' + node.left.data);

               


                if ((node.color === 'Rojo') && (node.left.color === 'Rojo')) {

                    console.log('tenemos dos nodos rojos, padre: '+node.data+ ' e hijo izquierdo: '+node.left.data);

                    this.caseOneB(node.left,'right');
                    this.inOrderComp(BST.root);

                    


                }
            }

            if (node.right !== null) {
                console.log('node: ' + node.data);
                console.log('node right: ' + node.right.data);

                if ((node.color === 'Rojo') && (node.right.color === 'Rojo')) {

                    console.log('tenemos dos nodos rojos, padre: '+node.data+ ' e hijo derecho: '+node.right.data);

                    this.caseTwoB(node.right,'left');
                    this.inOrderComp(BST.root);
                }


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
        if (node === BST.root) { return console.log('es la raiz') }
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

            } else {
                console.log(node.data + ' No tiene tio (theUncle)');
                return null

            }

        } else {
            console.log(node.data + ' No tiene tio (theUncle)');
            return null
        }
    }

    changeColor(node) {
        if (node.color === 'Rojo') {node.color = 'Negro';}
    }


}

const BST = new BinarySearchTree();
//Dos nodos rojos seguidos con tio
//BST.insert(20); BST.insert(10); BST.insert(30); //BST.insert(5);
//Dos nodos rojos seguidos sin tio
//BST.insert(20);BST.insert(10);BST.insert(5);
//BST.insert(20);BST.insert(30);BST.insert(35);

BST.insert(47);BST.insert(60);BST.insert(22);BST.insert(12);BST.insert(6);BST.insert(13);BST.insert(41);


BST.inOrder(BST.root);

