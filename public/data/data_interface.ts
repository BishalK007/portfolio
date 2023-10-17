interface Data {
  name: string;
  designation: string;
    profileImage: {
      src: {
        sq: string;
        bgRemoved: string;
        sqBgRemoved: string;
      }
      altText: string;
    };
    welcomeQuote: string;
    aboutMe: {
      firstName: string 
      lastName: string
      dob: string
      phoneNo: string
      city: string
      mail: string
      languages: string[]
      githubLink: string
      linkdinLink: string
      instagramLink:string
    };
    skills: {
      name: string
      progress: number
    }[];
    programming_languages: {
      name: string
      progress: number
    }[];
    experience: {
      company: string
      image: string
      role: string
      time: string
      work: string[]
    }[];
    projects: {
      name: string;
      imgSrc: string;
      about: string;
      tech: string[];
      url: string;
    }[];
    'get-contact': string[];
  }
  