import { getStorage, ref, uploadBytes, getDownloadURL, query, where, getDocs } from 'firebase/storage';
import { db, collection, addDoc, auth } from '@/firebase';

const storage = getStorage();

const uploadPlan = async (file, name, description, price) => {
  // Upload file to Firebase Storage
  const fileRef = ref(storage, `training-plans/${file.name}`);
  await uploadBytes(fileRef, file);

  // Get download URL
  const fileUrl = await getDownloadURL(fileRef);

  // Save metadata in Firestore
  await addDoc(collection(db, 'trainingPlans'), {
    name,
    description,
    price,
    fileUrl,
  });
};

const fetchTrainingPlans = async () => {
    const plansCol = collection(db, 'trainingPlans');
    const planSnapshot = await getDocs(plansCol);
    const plans = planSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return plans;
};

const savePurchase = async (planId) => {
    const userId = auth.currentUser.uid;
    await addDoc(collection(db, 'purchases'), {
      userId,
      planId,
      timestamp: new Date(),
    });
}

const checkPurchase = async (planId) => {
    const userId = auth.currentUser.uid;
    const purchasesCol = collection(db, 'purchases');
    const q = query(purchasesCol, where('userId', '==', userId), where('planId', '==', planId));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // Returns true if user has purchased the plan
};

const downloadPlan = async (planId) => {
    const hasPurchased = await checkPurchase(planId);
    if (!hasPurchased) {
      alert('You need to purchase this plan first.');
      return;
    }
  
    // Fetch plan details
    const planDoc = await getDoc(doc(db, 'trainingPlans', planId));
    const fileUrl = planDoc.data().fileUrl;
  
    // Open download link
    window.open(fileUrl, '_blank');
};