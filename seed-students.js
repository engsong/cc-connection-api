const laoFirstNames = [
  'Bounmy', 'Khamla', 'Somphou', 'Noy', 'Bounsou',
  'Keo', 'Vong', 'Souk', 'Phet', 'Daeng'
];

const laoLastNames = [
  'Phomvihane', 'Sisavath', 'Vongphet', 'Chanthavong', 'Xayavong',
  'Sourivong', 'Keomany', 'Phetsiriseng', 'Vongdara', 'Chanthaboun'
];

const laoProvinces = [
  'Vientiane', 'Luang Prabang', 'Savannakhet', 'Champasak', 'Xieng Khouang'
];

const laoVillages = [
  'Ban Phonhong', 'Ban Sisattanak', 'Ban Xaysetha', 'Ban Sikhottabong', 'Ban Naxaithong'
];

const ethnicities = ['Lao Loum', 'Hmong', 'Khmu', 'Lao Theung', 'Tai Dam'];
const religions = ['Buddhism', 'Animism', 'Buddhism', 'Christianity', 'Buddhism'];

function generateStudent(index) {
  const firstName = laoFirstNames[index % laoFirstNames.length];
  const lastName = laoLastNames[index % laoLastNames.length];
  const gender = index % 2 === 0 ? 'Male' : 'Female';
  const birthYear = 2010 + (index % 8); // Ages 14-21
  
  return {
    student_id: `LAO${String(index + 1).padStart(5, '0')}`,
    first_name: firstName,
    last_name: lastName,
    dob: `${birthYear}-0${(index % 9) + 1}-15`,
    gender: gender,
    nationality: 'Lao',
    ethnicity: ethnicities[index % ethnicities.length],
    religion: religions[index % religions.length],
    live_with: index % 3 === 0 ? 'Parents' : index % 3 === 1 ? 'Grandparents' : 'Guardian',
    address: `${laoVillages[index % laoVillages.length]}, ${laoProvinces[index % laoProvinces.length]}, Laos`,
    village_id: `VL${String(index + 1).padStart(4, '0')}`,
    profile_image_path: 'uploads/students/default.jpg',
    emergency_contacts: [
      {
        name: `${firstName}'s Parent`,
        relationship: 'Parent',
        phone: `020${String(55000000 + index).substring(0, 8)}`
      }
    ],
    saving_wallet: 0,
    is_active: true
  };
}

const students = Array.from({ length: 10 }, (_, i) => generateStudent(i));

async function seedStudents() {
  console.log('Seeding 10 Laos students...\n');
  
  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    
    try {
      // Create FormData for multipart/form-data
      const formData = new FormData();
      formData.append('student_id', student.student_id);
      formData.append('first_name', student.first_name);
      formData.append('last_name', student.last_name);
      formData.append('dob', student.dob);
      formData.append('gender', student.gender);
      formData.append('nationality', student.nationality);
      formData.append('ethnicity', student.ethnicity);
      formData.append('religion', student.religion);
      formData.append('live_with', student.live_with);
      formData.append('address', student.address);
      formData.append('village_id', student.village_id);
      formData.append('profile_image_path', student.profile_image_path);
      formData.append('emergency_contacts', JSON.stringify(student.emergency_contacts));
      formData.append('saving_wallet', student.saving_wallet);
      formData.append('is_active', student.is_active);
      
      const response = await fetch('http://localhost:3001/api/v1/students', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log(`✓ Created: ${student.first_name} ${student.last_name} (${student.student_id})`);
      } else {
        const error = await response.text();
        console.log(`✗ Failed: ${student.first_name} ${student.last_name} - ${error}`);
      }
    } catch (error) {
      console.log(`✗ Error: ${student.first_name} ${student.last_name} - ${error.message}`);
    }
  }
  
  console.log('\nSeeding completed!');
}

seedStudents();
