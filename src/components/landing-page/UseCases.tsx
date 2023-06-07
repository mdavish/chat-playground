interface UseCase {
  title: string,
  description: string,
  image: string,
}

const useCases: UseCase[] = [
  {
    title: 'Support',
    description: 'Yext Chat helps your customers troubleshoot issues, and get answers to questions.',
    image: '/marketing.svg',
  },
  {
    title: 'Marketing',
    description: 'You can use your product to help win new customers, secure leads, and educate prospects.',
    image: '/support.svg',
  },
  {
    title: 'Workplace',
    description: 'Yext Chat can be used to help your employees find the information they need to do their jobs.',
    image: '/workplace.svg',
  },
  {
    title: 'Commerce',
    description: 'Yext Chat can be used to help your customers find the right product for them.',
    image: '/commerce.svg',
  },
]

export default function UseCases() {
  return (
    <div className='lg:my-auto lg:py-10 h-full grid lg:grid-cols-2 lg:grid-rows-2 grid-cols-1 grid-rows-4 gap-y-8 gap-x-8'>
      {
        // Map the same thing 4 times
        useCases.map(({ title, image, description }) => (
          <div className='flex flex-row gap-x-4 lg:flex-col w-full h-full bg-gradient-to-tr from-gray-900 to-black rounded-2xl border border-gray-800 p-4 text-white'>
            <div className='shrink-0 bg-white rounded-full my-auto w-20 h-20 lg:w-36 lg:h-36 mx-auto'>
              <img src={image} />
            </div>
            <div className='text-left lg:text-center my-auto flex flex-col gap-y-4'>
              <h3 className='text-2xl'>
                {title}
              </h3>
              <p className='text-gray-300'>
                {description}
              </p>
            </div>
          </div>
        ))
      }
    </div>
  )
}