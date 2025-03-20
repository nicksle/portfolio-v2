import React from 'react';
import PropTypes from 'prop-types';
import { DropdownGroup } from '../DropdownGroup/DropdownGroup';

// Default items if none are provided
const defaultCaseStudy1Info = [
  {
    id: 1,                    // Unique identifier for React keys
    index: 1,                 // Displayed as "01" in top-left
    company: "Problem",         // Main title in the dropdown
    role: "Identify the Problems",  // Shown in top-right
    period: "2023 - 2024", // Year is extracted for bottom-right
    bodyItems: [
      {
        layout: "row",
        content: [
          {
            type: "text",
            text: "Despite strong app download numbers, we faced a critical challenge: users weren't completing the sign-up process. Our analytics revealed a significant drop-off between app installation and account creation."
          },
          {
            type: "image",
            src: "https://picsum.photos/800/400?random=3"
          }
        ]
      },
    ]
  },
  {
    id: 2,
    index: 2,
    company: "Goals",
    role: "Define Business and User Goals",
    period: "2022 - 2023",
    description: "Developed and maintained multiple client-facing applications, focusing on performance optimization and user experience improvements.",
    bodyItems: [
        {
          layout: "row",
          content: [
            {
              type: "text",
              text: "TANDA is a fintech startup dedicated to making financial security accessible to everyone. Through our iOS and Android mobile apps, we offer a community-driven savings service that empowers users to reach their financial goals."
            },
            {
              type: "image",
              src: "https://picsum.photos/800/400?random=3"
            }
          ]
        },
        {
          layout: "row",
          content: {
            type: "selected-work",
            works: [
              {
                index: 1,
                subtitle: "Roster Management",
                image: "https://picsum.photos/800/400?random=1",
                title: "Roster Optimization",
                description: "Redesigned roster management interface resulting in 40% faster schedule creation"
              },
              {
                index: 2,
                subtitle: "Mobile Experience",
                image: "https://picsum.photos/800/400?random=2",
                title: "Mobile App Redesign",
                description: "Led complete overhaul of mobile experience, increasing user engagement by 65%"
              }
            ]
          }
        }
      ]
  },
  {
    id: 3,
    index: 3,
    company: "Research and Understanding",
    role: "Define Business and User Goals",
    period: "2020 - 2022",
    description: "Led frontend development initiatives, implemented responsive designs, and improved application performance through optimization techniques.",
    bodyItems: [
        {
          layout: "row",
          content: [
            {
              type: "text",
              text: "Jetfuel is a performance-based influencer marketing platform connecting our network of influencers to a myriad of advertisers; giving our users more direct access to monetization opportunities, and relationship building with advertisers."
            },
            {
              type: "image",
              src: "https://picsum.photos/800/400?random=3"
            }
          ]
        },
        {
          layout: "row",
          content: {
            type: "selected-work",
            works: [
              {
                index: 1,
                subtitle: "Roster Management",
                image: "https://picsum.photos/800/400?random=1",
                title: "Roster Optimization",
                description: "Redesigned roster management interface resulting in 40% faster schedule creation"
              },
              {
                index: 2,
                subtitle: "Mobile Experience",
                image: "https://picsum.photos/800/400?random=2",
                title: "Mobile App Redesign",
                description: "Led complete overhaul of mobile experience, increasing user engagement by 65%"
              }
            ]
          }
        }
      ]
  },
  {
    id: 4,
    index: 4,
    company: "Guiding Insights",
    role: "Product Design Intern",
    period: "2019",
    description: "Built and maintained full-stack web applications, collaborated with cross-functional teams, and implemented cloud-based solutions using AWS services.",
    bodyItems: [
        {
          layout: "row",
          content: [
            {
              type: "text",
              text: "TANDA is a fintech startup dedicated to making financial security accessible to everyone. Through our iOS and Android mobile apps, we offer a community-driven savings service that empowers users to reach their financial goals."
            },
            {
              type: "image",
              src: "https://picsum.photos/800/400?random=3"
            }
          ]
        },
        {
          layout: "row",
          content: {
            type: "selected-work",
            works: [
              {
                index: 1,
                subtitle: "Roster Management",
                image: "https://picsum.photos/800/400?random=1",
                title: "Roster Optimization",
                description: "Redesigned roster management interface resulting in 40% faster schedule creation"
              },
              {
                index: 2,
                subtitle: "Mobile Experience",
                image: "https://picsum.photos/800/400?random=2",
                title: "Mobile App Redesign",
                description: "Led complete overhaul of mobile experience, increasing user engagement by 65%"
              }
            ]
          }
        }
      ]
  },
  {
    id: 5,
    index: 5,
    company: "Solutions and Implementation",
    role: "Product Design Intern",
    period: "2019",
    description: "Built and maintained full-stack web applications, collaborated with cross-functional teams, and implemented cloud-based solutions using AWS services.",
    bodyItems: [
        {
          layout: "row",
          content: [
            {
              type: "text",
              text: "TANDA is a fintech startup dedicated to making financial security accessible to everyone. Through our iOS and Android mobile apps, we offer a community-driven savings service that empowers users to reach their financial goals."
            },
            {
              type: "image",
              src: "https://picsum.photos/800/400?random=3"
            }
          ]
        },
        {
          layout: "row",
          content: {
            type: "selected-work",
            works: [
              {
                index: 1,
                subtitle: "Roster Management",
                image: "https://picsum.photos/800/400?random=1",
                title: "Roster Optimization",
                description: "Redesigned roster management interface resulting in 40% faster schedule creation"
              },
              {
                index: 2,
                subtitle: "Mobile Experience",
                image: "https://picsum.photos/800/400?random=2",
                title: "Mobile App Redesign",
                description: "Led complete overhaul of mobile experience, increasing user engagement by 65%"
              }
            ]
          }
        }
      ]
  },
];

export const CaseStudy1Info = ({ 
  items = defaultCaseStudy1Info,
  className,
  shouldCloseDropdowns
}) => {
  const handleDropdownOpen = (index) => {
    const container = document.querySelector('.work-experience');
    if (container) {
      const headerHeight = 64;
      const padding = 32;
      const closedDropdownHeight = 80;
      const openDropdownHeight = 600;
      
      let scrollPosition = 0;
      
      for (let i = 1; i < index; i++) {
        const dropdown = container.querySelector(`[data-dropdown-index="${i}"]`);
        if (dropdown && dropdown.classList.contains('open')) {
          scrollPosition += openDropdownHeight;
        } else {
          scrollPosition += closedDropdownHeight;
        }
      }
      
      scrollPosition -= (headerHeight + padding);
      
      container.scrollTo({
        top: Math.max(0, scrollPosition),
        behavior: 'smooth'
      });
    }
  };

  const handleDropdownClose = (index) => {
    // Find the dropdown body and reset its scroll position
    const dropdown = document.querySelector(`[data-dropdown-index="${index}"]`);
    if (dropdown) {
      const dropdownBody = dropdown.querySelector('.dropdown-body');
      if (dropdownBody) {
        dropdownBody.scrollTo({
          top: 0,
          behavior: 'instant' // Use 'instant' to avoid animation when closing
        });
      }
    }
  };

  return (
    <DropdownGroup 
      items={items}
      className={className}
      shouldCloseDropdowns={shouldCloseDropdowns}
      onDropdownOpen={handleDropdownOpen}
      onDropdownClose={handleDropdownClose}
    />
  );
};

CaseStudy1Info.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      index: PropTypes.number.isRequired,
      company: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      period: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      bodyItems: PropTypes.arrayOf(
        PropTypes.shape({
          layout: PropTypes.oneOf(["column", "row"]).isRequired,
          content: PropTypes.oneOfType([
            PropTypes.shape({
              type: PropTypes.oneOf([
                "text",
                "image",
                "selected-work",
                "list-group",
                "card-group"
              ]).isRequired,
              text: PropTypes.string,
              src: PropTypes.string,
              works: PropTypes.arrayOf(
                PropTypes.shape({
                  index: PropTypes.number.isRequired,
                  subtitle: PropTypes.string.isRequired,
                  image: PropTypes.string.isRequired,
                  title: PropTypes.string.isRequired,
                  description: PropTypes.string.isRequired,
                })
              )
            }),
            PropTypes.arrayOf(
              PropTypes.shape({
                type: PropTypes.oneOf([
                  "text",
                  "image",
                  "selected-work",
                  "list-group",
                  "card-group"
                ]).isRequired,
                text: PropTypes.string,
                src: PropTypes.string
              })
            )
          ]).isRequired
        })
      ).isRequired
    })
  ),
  className: PropTypes.string,
  shouldCloseDropdowns: PropTypes.bool
};

export default CaseStudy1Info; 