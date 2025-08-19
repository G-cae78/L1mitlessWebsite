<template>
  <div class="merchandise-page">
    <!-- Coming Soon Banner -->
    <!-- <div class="coming-soon-banner">
      <div class="banner-text">COMING SOON</div>
    </div> -->

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
  isMerchandise: boolean;
}

export default defineComponent({
  name: 'MerchandisePage',
  data() {
    return {
      products: [
        {
          isMerchandise: true,
          productId: "prod_S26fyB25tyKpD1",
          name: "Become L1MITLESS Club Tee",
          description: 'A sleek and stylish tee to represent the LIMITLESS lifestyle.',
          price: 28.99,
          image: require('@/assets/shirtBack.png'),
          images: [
            require('@/assets/Front.png'),
            require('@/assets/Folded.png'),
            //require('@/assets/shirtDetail2.png')
          ],
          sizes: ['S', 'M', 'L', 'XL'],
          additionalInfo: '100% cotton, machine washable, slim fit design',
        },
        {
          isMerchandise: true,
          productId: "prod_SEUjEtXcDyN3CW",
          name: "L1MITLESS Athletic Vest",
          description: 'L1mitless Hybrid Vest, perfect for hitting workouts and casual wear.',
          price: 26.99,
          image: require('@/assets/frontvest.png'),
          images: [
            require('@/assets/frontvest.png'),
            require('@/assets/BackVest.png'),
            //require('@/assets/shirtDetail2.png')
          ],
          sizes: ['S', 'M', 'L', 'XL'],
          additionalInfo: `Product features
- Solid colors are 100% cotton, heather colors are a blend of cotton and viscose
- Cut-off sleeves boast a trendy raw edge for a modern look
- Ribbed knit collar retains shape while offering elasticity
- Made from 100% combed ringspun cotton for softness and comfort
- Lightweight fabric perfect for warm weather (4.4 oz/yd²)

Care instructions
- Machine wash: warm (max 40C or 105F)
- Non-chlorine: bleach as needed
- Tumble dry: medium
- Iron, steam or dry: low heat
- Do not dryclean`,
        },
        {
          isMerchandise: true,
          productId: "prod_SKU5WOYc3QYGLv",
          name: 'L1MITLESS Session Trucker',
          description: 'A sleek and stylish cap to represent the LIMITLESS lifestyle.',
          price: 35.99,
          image: require('@/assets/LoveAtFirstSet.png'),
          images: [
            require('@/assets/LoveAtFirstSet.png'),
            require('@/assets/L1mitlessLogoHatPurpleBottom.png'),
          ],
          sizes: ['One Size'],
          additionalInfo: 'Adjustable strap, 100% cotton',
        },
        {
          isMerchandise: true,
          productId: "prod_SEUciupfgBFNIc",
          name: "L1MITLESS Inspire Club Tee",
          description: 'Inspire the LIMITLESS lifestyle.',
          price: 26.99,
          image: require('@/assets/FrontInspire.jpg'),
          images: [
            require('@/assets/BackInspire.jpg'),
            require('@/assets/FrontInspire.jpg'),
            //require('@/assets/shirtDetail2.png')
          ],
          sizes: ['S', 'M', 'L', 'XL'],
          additionalInfo: '100% cotton, machine washable, slim fit design',
        },
        {
          isMerchandise: true,
          productId: "prod_S26c3i7MqPJkfG",
          name: "L1MITLESS Goldie Trucker",
          description: 'A sleek and stylish cap to represent the LIMITLESS lifestyle.',
          price: 29.99,
          image: require('@/assets/L1mitlessHat1.png'),
          images: [
            require('@/assets/L1mitlessHat1.png'),
            require('@/assets/L1mitlessHatModel.png')
          ],
          sizes: ['One Size'],
          additionalInfo: 'Adjustable strap, 100% cotton',
        },
        {
          isMerchandise: true,
          productId: "prod_S26eHCm3dhcXdr",
          name: 'L1MITLESS Trucker Cap',
          description: 'A sleek and stylish cap to represent the LIMITLESS lifestyle.',
          price: 25.99,
          image: require('@/assets/Cap3.png'),
          images: [
            require('@/assets/Cap3.png'),
            require('@/assets/L1mitlesshatModel2.png')
          ],
          sizes: ['One Size'],
          additionalInfo: 'Adjustable strap, 100% cotton',
        },
        {
          isMerchandise: true,
          productId: "prod_SKU1P30RE8Pztr",
          name: 'L1MITLESS Purple Sproose',
          description: 'A sleek and stylish cap to represent the LIMITLESS lifestyle.',
          price: 35.99,
          image: require('@/assets/L1mitlessLogoHatPurple.png'),
          images: [
            require('@/assets/L1mitlessLogoHatPurple.png'),
            require('@/assets/L1mitlessLogoHatPurpleBottom.png'),
          ],
          sizes: ['One Size'],
          additionalInfo: 'Adjustable strap, 100% cotton',
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
  /* Coming Soon Banner */
  .coming-soon-banner {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #ff3b30;
    color: white;
    text-align: center;
    padding: 12px 0;
    z-index: 1000;
    animation: slideInOut 3s infinite;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }

  .banner-text {
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    animation: pulse 1.5s infinite;
  }

  @keyframes slideInOut {
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }
    15%, 85% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(-100%);
      opacity: 0;
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

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
    color: #2e2d2d;
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