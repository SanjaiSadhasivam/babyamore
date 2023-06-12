
const reducer = (state, action) => {


    // console.log(state, "state")


    if (action.type === "ADD_TO_CART") {

        const { product, qtys, a, attributeid, attproduct,variant_1,variant_2,variant_1_name,variant_2_name } = action.payload;
        console.log(variant_1,variant_2, 'productproduct');
        if (a > 0) {

            if (attributeid) {
                let existprodct = state.carts.find((curr) => curr.product_attributeid == attributeid);

                // console.log(existprodct, "existprodct")
                if (existprodct) {
                    const updateProducts = state.carts.map((curr) => {
                        if (curr.product_attributeid == attributeid) {
                            let updateqty = qtys;

                            let amount = (product.SalePrice * updateqty);
                            return {
                                ...curr,
                                product_total: amount,
                                ProductQuantity: updateqty,

                            }
                        }
                        else {
                            return curr;
                        }
                    });


                    //put
                    // axios.put(`${API_CART}`, updateProducts, config)

                    return {
                        ...state,
                        carts: updateProducts,


                    }



                }
                else {


                    var cartProducts = {
                        ProductName: attproduct.ProductName,
                        RegularPrice: attproduct.RegularPrice,
                        SalePrice: attproduct.SalePrice,
                        DiscountRate: attproduct.DiscountRate,
                        // Userid: cookies.customer_id,
                        ProductImage: attproduct.ProductImage,
                        Productid: attributeid,
                        PreOrderQuantity: product.PreOrderQuantity,
                        SoldIndividual: product.SoldIndividual,
                        ProductQuantity: 1,
                        product_total: 0,
                        variant_1:variant_1,
                        variant_2:variant_2,
                        variant_1_name:variant_1_name,
                        variant_2_name:variant_2_name,
                        product_attributeid: attributeid,
                        main_id:product.Productlist_id
                        
                    }
                    // axios.post(`${API_CART}`, cartProducts, config)
                    // console.log(cartProducts, "cartProducts")
                    return {
                        ...state,
                        carts: [...state.carts, cartProducts],
                        view_cart: [...state.view_cart, product.Productlist_id],

                    };
                }
            }
            else {
                alert("Please select some product options before adding this product to your cart.")
            }

        } else {

            let existprodct = state.carts.find((curr) => curr.Productid == product.Productlist_id);

            // console.log(existprodct, "existprodct")
            if (existprodct) {
                const updateProducts = state.carts.map((curr) => {
                    if (curr.Productid == product.Productlist_id) {
                        let updateqty = qtys;

                        let amount = (product.SalePrice * updateqty);
                        return {
                            ...curr,
                            product_total: amount,
                            ProductQuantity: updateqty,

                        }
                    }
                    else {
                        return curr;
                    }
                });


                //put
                // axios.put(`${API_CART}`, updateProducts, config)

                return {
                    ...state,
                    carts: updateProducts,


                }



            }
            else {

                var cartProducts = {
                    ProductName: product.ProductName,
                    RegularPrice: product.RegularPrice,
                    SalePrice: product.SalePrice,
                    // Userid: cookies.customer_id,
                    ProductImage: product.ProductImage,
                    Productid: product.Productlist_id,
                    DiscountRate: product.DiscountRate,
                    ProductQuantity: 1,
                    product_total: 0,
                    PreOrderQuantity: product.PreOrderQuantity,
                    SoldIndividual: product.SoldIndividual,
                    product_attributeid: attributeid,
                    main_id:product.Productlist_id
                }
                // axios.post(`${API_CART}`, cartProducts, config)
                // console.log(cartProducts, "cartProducts")
                return {
                    ...state,
                    carts: [...state.carts, cartProducts],
                    view_cart: [...state.view_cart, product.Productlist_id],

                };
            }
        }

    }



    if (action.type === "REMOVE_TO_CART") {
        // console.log(action.payload, "updateProduct")
        const updateProduct = state.carts.filter((currEle) => {
            return currEle.Productid !== action.payload;
        });
        const viewUpdate = state.view_cart.filter((currEle) => {
            return currEle !== action.payload;
        });
        return {
            ...state,
            carts: updateProduct,
            view_cart: viewUpdate,
        };
    }

    if (action.type === "DECRESE_QTY") {

        // console.log(action.payload, "product_id")
        const updateQty = state.carts.map((currEle) => {
            if (currEle.Productid === action.payload) {
                let decAmount = currEle.qty - 1;
                return {
                    ...currEle,
                    ProductQuantity: decAmount,
                }
            }
            else {
                return currEle;
            }

        });




        return {
            ...state,
            carts: updateQty
        }
    }

    if (action.type === "INCRESE_QTY") {

        // console.log(action.payload, "product_id")
        const updateQty = state.carts.map((currEle) => {
            if (currEle.Productid === action.payload) {
                let decAmount = currEle.qty + 1;
                return {
                    ...currEle,
                    ProductQuantity: decAmount,
                }
            }
            else {
                return currEle;
            }

        });




        return {
            ...state,
            carts: updateQty
        }
    }







    if (action.type === "CART_TOTAL_PRICE") {

        let total_price = state.carts.reduce((intial, curr) => {
            // console.log("-----------------------",SalePrice);
            const { RegularPrice, ProductQuantity } = curr;
            let initial = intial + RegularPrice * ProductQuantity;
            return initial
        }, 0)
        // let total_cart_items = state.carts.reduce((intial, curr) => {
        //     const { ProductQuantity } = curr;

        //     let initial = intial + ProductQuantity;
        //     return initial
        // }, 0)
        let total_cart_items = state.carts.length;
        return {
            ...state,
            total_amount: total_price,
            total_items: total_cart_items,
        }
    }
    if (action.type === "GET_CART_QTY") {
        return {
            ...state,
            total_qty: action.payload,
        }
    }
    if (action.type === "GET_WISHLIST") {
        return {

            ...state,
            wishlist: action.payload,
        }
    }
    if (action.type === "GET_CART") {
        let { cart, subtotal, qtys } = action.payload;
        console.log(subtotal, "subtotal")
        return {
            ...state,
            cart: cart,
            sub_total: subtotal,
            total_qty: qtys
        }
    }
    if (action.type === "TOGGLE") {
        return {
            ...state,
            toggles: !state.toggles,
        }
    }
    if (action.type === "VIEW_CARTID") {
        return {
            ...state,
            cart_id: [...state.cart_id, action.payload],
        }
    }
    if (action.type === "PINCODE") {
        let { pinData, pincode } = action.payload;

        return {
            ...state,
            pincodeitems: pinData,
            pincode: pincode,
            pincodebtn: true,
            modalToggle: false,
        }
    }
    if (action.type === "USERPINCODE") {
        let { pinData, pincode } = action.payload;

        return {
            ...state,
            pincodeitems: pinData,
            pincode: pincode,
            pincodebtn: false,
        }
    }
    if (action.type === "OFF") {


        return {
            ...state,
            pincodeitems: [],
            pincodebtn: false,
        }
    }
    if (action.type === "TOOGLEON") {


        return {
            ...state,
            modalToggle: true,
            error: false,
        }
    }
    if (action.type === "TOOGLEOFF") {


        return {
            ...state,
            modalToggle: false,
            error: false,
        }
    }
    if (action.type === "ERROR") {


        return {
            ...state,
            error: true,
        }
    }
    if (action.type === "SET_CATEGORY") {


        return {
            ...state,
            category: action.payload,
        }
    }
    if (action.type === "SET_BRAND") {


        return {
            ...state,
            brands: action.payload,
        }
    }
    return state;
}


export default reducer;