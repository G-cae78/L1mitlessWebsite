<template>
  <div class="merchandise-page">
    <p class="subtitle">Shop our exclusive collection to support and represent the L1MITLESS lifestyle.</p>

    <div class="merch-container">
      <div 
        class="product-card" 
        v-for="product in products" 
        :key="product.productId"
        @click="viewProductDetails(product)"
      >
        <img :src="product.image" :alt="product.name" class="product-image" />
        <div class="product-details">
          <h2>{{ product.name }}</h2>
          <p class="price">€{{ product.price }}</p>
          <p class="description">{{ product.description }}</p>
          <button class="add-to-cart-button">View Details</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

interface Product {
  productId: string;
  name: string;
  price: number;
  image: string;
  images?: string[];
  description: string;
  sizes: string[];
  additionalInfo?: string;
}

export default defineComponent({
  name: 'MerchandisePage',
  data() {
    return {
      products: [
        {
          productId: "prod_S26fyB25tyKpD1",
          name: "Become L'1'mitless Club Tee",
          description: 'A sleek and stylish tee to represent the LIMITLESS lifestyle.',
          price: 25.99,
          image: require('@/assets/shirtBack.png'),
          images: [
            require('@/assets/Front.png'),
            require('@/assets/Folded.png'),
            //require('@/assets/shirtDetail2.png')
          ],
          sizes: ['S', 'M', 'L', 'XL'],
          additionalInfo: '100% cotton, machine washable, slim fit design'
        },
        {
          productId: "prod_S26c3i7MqPJkfG",
          name: "L'1'mitless Trucker Cap",
          description: 'A sleek and stylish cap to represent the LIMITLESS lifestyle.',
          price: 25.99,
          image: require('@/assets/Cap2.png'),
          images: [
            require('@/assets/Cap2.png'),
            //require('@/assets/Cap2_alt2.png')
          ],
          sizes: ['One Size'],
          additionalInfo: 'Adjustable strap, 100% cotton'
        },
        {
          productId: "prod_S26c3i7MqPJkfG",
          name: 'L1MITLESS Trucker Cap',
          description: 'A sleek and stylish cap to represent the LIMITLESS lifestyle.',
          price: 25.99,
          image: require('@/assets/Cap3.png'),
          images: [
            require('@/assets/Cap3.png'),
            //require('@/assets/Cap2_alt2.png')
          ],
          sizes: ['One Size'],
          additionalInfo: 'Adjustable strap, 100% cotton'
        },
        // Add more products as needed
      ] as Product[],
      product: null as Product | null,
      mainImage: '',
      selectedSize: ''
    };
  },
  methods: {
  viewProductDetails(product: Product) {
    console.log('Navigating to product:', product); 
    this.$router.push({
      name: 'product',
      params: { id: product.productId } // Pass productId as a route parameter
    });
  }
}

});
</script>
<style scoped>
  .merchandise-page {
    padding: 20px;
    text-align: center;
  }
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    color: #333;
  }
  
  .subtitle {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 30px;
  }
  
  .merch-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
  
  .product-card {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    width: 100%;
    max-width: 300px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
  
  .product-image {
    width: 110%;
    height: 300px;
    object-fit: cover;
  }
  
  .product-details {
    padding: 15px;
    text-align: left;
  }
  
  h2 {
    font-size: 1.3rem;
    margin-bottom: 10px;
    color: #333;
  }
  
  .price {
    font-size: 1.1rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
  }
  
  .description {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 15px;
  }
  
  .size-select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 15px;
    font-size: 0.9rem;
  }
  
  .add-to-cart-button {
    width: 100%;
    padding: 10px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .add-to-cart-button:hover {
    background-color: #555;
  }
  </style>