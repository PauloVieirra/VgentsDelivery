import React, { useEffect, useState } from 'react';
import firebase from '../../config/firebaseConfig';
import { useAuth } from '../../Context/AuthContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import './styles.css';

const ProductList = () => {
  const {user, deleteProduct} = useAuth();
  const [products, setProducts] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
  const [showActiveItems, setShowActiveItems] = useState(false);
  const [showInactiveItems, setShowInactiveItems] = useState(true);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isPromotedModalOpen, setIsPromotedModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchProductsFromFirebase = async () => {
    if (user) {
      const productsRef = firebase.database().ref(`users/${user.uid}/products`);
      productsRef.on('value', (snapshot) => {
        const productsData = snapshot.val();
        if (productsData) {
          const productsList = Object.values(productsData);
          setProducts(productsList);
          localStorage.setItem('products', JSON.stringify(productsList));
        }
      });
    }
  };

  useEffect(() => {
    fetchProductsFromFirebase();
  }, [user]);

  useEffect(() => {
    handleSearch();
  }, [products, showActiveItems, searchTerm, showInactiveItems]);

  const handleSearch = () => {
    const filtered = products.filter((product) => {
      const titleIncludesSearchTerm = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryIncludesSearchTerm = product.category.toLowerCase().includes(searchTerm.toLowerCase());
      const isActive = product.isActive;

      if (showActiveItems && !showInactiveItems) {
        return isActive && (titleIncludesSearchTerm || categoryIncludesSearchTerm);
      } else if (!showActiveItems && showInactiveItems) {
        return !isActive && (titleIncludesSearchTerm || categoryIncludesSearchTerm);
      } else if (!showActiveItems && !showInactiveItems) {
        return false;
      } else {
        return isActive && (titleIncludesSearchTerm || categoryIncludesSearchTerm);
      }
    });

    setFilteredProducts(filtered);
  };

  const handleUpdateProducts = async () => {
    try {
      await fetchProductsFromFirebase();
      setUpdateStatus('Lista atualizada com sucesso!');
      setTimeout(() => {
        setUpdateStatus(null);
      }, 5000);
    } catch (error) {
      console.error('Erro ao atualizar produtos:', error.message);
      setUpdateStatus('Erro ao atualizar a lista de produtos. Por favor, tente novamente mais tarde.');
    }
  };

  const handleOpenModal = (product) => {
    setEditedProduct(product);
    setIsModalOpen(true);
    setEditedProduct((prevProduct) => ({ ...prevProduct, isActive: product.isActive }));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);

    if (editedProduct) {
      setProducts((prevProducts) =>
        prevProducts.map((product) => {
          if (product.id === editedProduct.id) {
            return editedProduct;
          }
          return product;
        })
      );
    }
  };

  const handleSaveProduct = async () => {
    try {
      if (user && editedProduct) {
        const productsRef = firebase.database().ref(`users/${user.uid}/products/${editedProduct.id}`);
        await productsRef.update({
          title: editedProduct.title,
          category: editedProduct.category,
          description: editedProduct.description,
          price: editedProduct.price,
          isActive: editedProduct.isActive,
       
        });

        setIsModalOpen(false);
        setUpdateStatus('Produto atualizado com sucesso!');
        setTimeout(() => {
          setUpdateStatus(null);
        }, 5000);
      }
    } catch (error) {
      console.error('Erro ao atualizar produto:', error.message);
      setUpdateStatus('Erro ao atualizar o produto. Por favor, tente novamente mais tarde.');
    }
  };

  const handleUpdateProductStatus = async (product) => {
    try {
      const productsRef = firebase.database().ref(`users/${user.uid}/products/${product.id}`);
      await productsRef.update({
        isActive: !product.isActive,
      });

      setUpdateStatus('Status do produto atualizado com sucesso!');
      setTimeout(() => {
        setUpdateStatus(null);
      }, 5000);
    } catch (error) {
      console.error('Erro ao atualizar status do produto:', error.message);
      setUpdateStatus('Erro ao atualizar o status do produto. Por favor, tente novamente mais tarde.');
    }
  };

  const handleSwitchChange = (e) => {
    const { checked } = e.target;
    setEditedProduct((prevProduct) => ({ ...prevProduct, isActive: checked }));
  };

const handlePromoteProduct = async (productId, isPromoted) => {
  try {
    console.log('Chamando handlePromoteProduct');

    const productRef = firebase.database().ref(`users/${user.uid}/products/${productId}`);
    const promotedProductsRef = firebase.database().ref(`/promotedProducts`);

    const snapshot = await productRef.once('value');
    const productData = snapshot.val();

    // Adiciona a propriedade booleana 'isPromoted' ao objeto
    productData.isPromoted = true;

    // Verifique se o produto já está no nó promotedProducts
    const isProductPromoted = await promotedProductsRef
      .orderByChild('id')
      .equalTo(productId)
      .once('value');

    if (isPromoted && !isProductPromoted.exists()) {
      console.log('Promovendo produto:', productData);
      await promotedProductsRef.push(productData);
    } else if (!isPromoted && isProductPromoted.exists()) {
      console.log('Despromovendo produto:', productData);

      // Remova o produto do nó promotedProducts usando a chave do produto
      const productKey = Object.keys(isProductPromoted.val())[0];
      await promotedProductsRef.child(productKey).remove();
    }

    // Atualiza a propriedade isPromoted no produto original no banco de dados
    await productRef.update({ isPromoted });

    setUpdateStatus('Produto promovido/despromovido com sucesso!');
    setTimeout(() => {
      setUpdateStatus(null);
    }, 5000);
  } catch (error) {
    console.error('Erro ao promover/despromover produto:', error.message);
    setUpdateStatus('Erro ao promover/despromover o produto. Por favor, tente novamente mais tarde.');
  }
};


const handleDeleteClick = (product) => {
  if (product.isPromoted) {
    // Produto promovido, abra o modal de aviso
    setProductToDelete(product);
    setIsPromotedModalOpen(true);
  } else {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  }
};

 
 const handleDelete = () =>{
  if (productToDelete) {
    deleteProduct(productToDelete.id);
    setIsDeleteModalOpen(false);
  }
 }





  return (
    <div className='contcardlistprod'>
      <div className='conttitlesprod'>
        <h2>Produtos Cadastrados</h2>
        <div className="continputrascu">
          <label htmlFor="showActiveItems">Mostrar rascunhos:</label>
          <input
            type="checkbox"
            id="showActiveItems"
            checked={showActiveItems}
            onChange={(e) => setShowActiveItems(e.target.checked)}
            style={{width:'20px'}}
          />
        </div>
        <button onClick={handleUpdateProducts} className='btnupdat'>
          Atualizar
        </button>
      </div>
      <div className='search-bar'>
        <input
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Buscar por título ou categoria'
          className='search-input'
        />
      </div>
      {updateStatus && (
        <div className={`update-status ${updateStatus.includes('sucesso') ? 'success' : 'error'}`}>
          {updateStatus}
        </div>
      )}
      <div className='contcadgridpro'>
        <div className='contgridlistpro'>
          {filteredProducts.map((product) => {
            if (showInactiveItems || product.isActive) {
              return (
                <Card key={product.id} className='product-cardpro'>

                  <button className='btneditecardpro' onClick={() => handleOpenModal(product)}>
                    <img src={product.imageUrl} alt={product.title} className='contimgpro' />
                    <h3 style={{ color: '#000' }}>{product.title}</h3>
                    <p style={{marginTop:'10px', textAlign:'justify'}}>{product.description}</p>
                    <p>Preço: R$ {product.price}</p>
                  </button>
               
                  <div className='contbtnpromote'>
                   <div  style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                       Promover
                      <input
                        type='checkbox'
                        checked={product.isPromoted}
                        onChange={() => handlePromoteProduct(product.id, !product.isPromoted)}
                        style={{display:'flex',width:'20px'}}
                      />
                     
                    </div>
                  
                    <button onClick={() => handleDeleteClick(product)}>Apagar</button>
                        </div>
                      
                        {isPromotedModalOpen && isDeleteModalOpen === false && productToDelete === product && (
                          <div className="promoted-product-modal">
                              <div className='card-prod-dellete'>
                            <div style={{display:'flex',justifyContent:'center', alignItems:'center',width:'100%', height:'100%'}}>
                              Você não pode excluir um produto promovido. Remova a promoção e tente novamente.
                            </div>
                            
                            <button onClick={() => setIsPromotedModalOpen(false)}>Fechar</button>
                               </div>
                          </div>
                        )}
                         {isDeleteModalOpen && isPromotedModalOpen === false && productToDelete === product && (
                            <div className="promoted-product-modal">
                               <div className='card-prod-dellete'>
                               <div style={{display:'flex',justifyContent:'center', alignItems:'center',width:'100%', height:'100%'}}>
                              <p>Tem certeza que deseja apagar este produto permanentemente?</p>
                                </div>
                                <div style={{display:'flex',flexDirection:'row',width:'100%', alignItems:'center', justifyContent:'space-between',alignContent:'space-between'}}> 
                              <button onClick={() => handleDelete(productToDelete.id)}>Confirmar</button>
                              <button onClick={() => setIsDeleteModalOpen(false)}>Cancelar</button>
                                </div>
                              </div>
                            </div>
                          )}
                    </Card>
              
              );
            }
            return null;
          })}
        </div>
      </div>
      {isModalOpen && editedProduct && (
        <div className='modal-overlay'>
          <div className='contmodalmood'>
            <div className='tittlemodal'>Editar produtos</div>
            <div className='modal'>
              <button className='modal-close' onClick={handleCloseModal}>
                Fechar
              </button>
              <div className='contmodalleft'>
                <img src={editedProduct.imageUrl} alt={editedProduct.title} className='modal-image' />
              </div>
              <div className='contmodalright'>
                <div>
                  <input
                    type='text'
                    value={editedProduct.title}
                    onChange={(e) => setEditedProduct({ ...editedProduct, title: e.target.value })}
                    className='modal-input'
                    maxLength="23"
                  />
                  <input
                    type='text'
                    value={editedProduct.category}
                    onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value })}
                    className='modal-input'
                  />
                  <textarea
                    value={editedProduct.description}
                    onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
                    className='modal-textarea'
                    maxLength="100"
                  />
                  <input
                    type='number'
                    value={editedProduct.price}
                    onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
                    className='modal-input'
                  />
                </div>
                <div className='contbtnsavemodal'>
                  <label>
                    <input
                      type='checkbox'
                      checked={editedProduct.isActive}
                      onChange={handleSwitchChange}
                    />
                    Ativar
                  </label>
                  <button className='modal-save' onClick={handleSaveProduct}>
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
