import type IFilterGroup from "@/tools/interfaces/IFilterGroup";
import type IListFilterProps from "@/tools/interfaces/IListFilterProps";
import { useState } from "react";
import styles from '../styles/listFilter.module.scss';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';

/**
 * List Page filter component. Will dynamically build a list of filters based on the
 * products that exist. Constructed using the site filter tag types in the database.
 * Displays all products that fix -any- of the checkboxes, and only those that match
 * the selected radio button groups.
 * 
 * - Groups with >10 options are shown inside a collapsible Accordion panel for better usability.
 * - Radio groups have a "None" option at top for clearing the selection (unselect radio).
 * 
 * @param IListFilterProps
 */
const ListFilter = ({
    products, 
    siteFilterTagTypes, 
    selectedFilters, 
    onChange}: IListFilterProps) => {

    //===========================================================================================================================
    /** 
     * Builds available options for each filter group (tag type) 
     * Each group contains options extracted from the products' productTags for that group.
     */
    const filterGroups: IFilterGroup[] = siteFilterTagTypes.map(siteType => {
        const tagTypeId = siteType.tagTypeId;
        const foundTags: {[tagId: number]: string} = {};
        products.forEach(product => {
            product.productTags?.forEach(pt => {
                if (pt.tag.tagType.id === tagTypeId) {
                    foundTags[pt.tag.id] = pt.tag.name;
                }
            })
        });

        const options = Object
            .entries(foundTags)
            .map(([id, name]) => ({
                id: Number(id),
                name
            }));

        return {
            id: tagTypeId,
            name: siteType.tagType.name,
            filterType: siteType.filterType,
            options
        }
    })

    //===========================================================================================================================
    /** Handles a checkbox filter change event. */
    const onCheckboxChange = (
        tagTypeId: number, 
        optionId: number) => {

        const prev = selectedFilters[tagTypeId] || [];
        let newVals: number[];
        if (prev.includes(optionId)) {
            newVals = prev.filter(id => id !== optionId);
        } else {
            newVals = [...prev, optionId];
        }
        onChange({...selectedFilters, [tagTypeId]: newVals});
    }

    //===========================================================================================================================
    /**
     * Handles a radio button filter change event.
     * Enhancement: supports "clear" option (optionId null) to reset/unselect the group.
     */
    const onRadioChange = (tagTypeId: number, optionId: number | null) => {
        if (optionId == null) {
            // Select "None": Clear the radio selection
            onChange({ ...selectedFilters, [tagTypeId]: [] });
        } else {
            // Select an option
            onChange({ ...selectedFilters, [tagTypeId]: [optionId] });
        }
    }

    //===========================================================================================================================
    /**
     * Accordion state for groups with >10 options
     * Allows tracking which filter groups are open/closed in the UI.
     */
    const [openAccordions, setOpenAccordions] = useState<Record<number, boolean>>({});
    const toggleAccordion = (id: number) => {
        setOpenAccordions(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    //===========================================================================================================================
    return (
        <Card className={`shadow ${styles.mainFilterCard}`}>
            <Card.Body className={styles.mainFilterCardBody}>
                <h6 className="fw-bold mb-3">
                    <i className="pi pi-filter me-1" />
                    Filters
                </h6>
                {
                    filterGroups
                        .filter(group => group.options.length > 0)
                        .map((group) => (
                            <Card key={group.id} className={`mb-3 border-0 ${styles.filterGroupCard}`}>
                                <Card.Body className="p-0">
                                    <Row className="align-items-center mb-1">
                                        <Col xs="auto">
                                            <i className={`pi pi-sliders-h ${styles.slider}`} />
                                        </Col>
                                        <Col className={`small fw-semibold ${styles.sliderText}`}>
                                            {group.name}
                                        </Col>
                                    </Row>
                                    <hr className="my-2" />
                                    {
                                        group.options.length > 10 
                                        ? (
                                            <Accordion activeKey={openAccordions[group.id] ? "0" : undefined}>
                                                <Accordion.Item eventKey="0">
                                                    <Accordion.Header onClick={() => toggleAccordion(group.id)}>
                                                        {
                                                            group.filterType === "checkbox"
                                                                ? `${group.options.length} options`
                                                                : `${group.options.length} choices`
                                                        }
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <Form>
                                                            {
                                                                group.filterType === "checkbox" && group.options.map(option => (
                                                                    <Form.Check key={option.id} 
                                                                                type="switch" 
                                                                                id={`filter-switch-${group.id}-${option.id}`} 
                                                                                label={
                                                                                    <span className="small" style={{ color: "#a2eafc" }}>
                                                                                        <i className="pi pi-check-circle text-info me-1" />
                                                                                        {option.name}
                                                                                    </span>
                                                                                }
                                                                                checked={(selectedFilters[group.id] || []).includes(option.id)}
                                                                                onChange={() => onCheckboxChange(group.id, option.id)}
                                                                                className={`mb-2 ${styles.filterCheckboxOptionLabel}`} />
                                                                ))
                                                            }
                                                            {
                                                                group.filterType === "radio" &&
                                                                <>
                                                                    <Form.Check type="radio"
                                                                                name={`filter-radio-group-${group.id}`}
                                                                                id={`filter-radio-${group.id}-clear`}
                                                                                label={
                                                                                    <span className="small" style={{ color: "#b6b4ff" }}>
                                                                                        <i className="pi pi-ban text-secondary me-1" />
                                                                                        <span style={{ fontStyle: "italic" }}>None</span>
                                                                                    </span>
                                                                                }
                                                                                checked={!((selectedFilters[group.id] || [])[0])}
                                                                                onChange={() => onRadioChange(group.id, null)}
                                                                                className={`mb-2 ${styles.filterRadioOptionLabel}`} />
                                                                    {
                                                                        group.options.map(option => (
                                                                            <Form.Check key={option.id}
                                                                                        type="radio"
                                                                                        name={`filter-radio-group-${group.id}`}
                                                                                        id={`filter-radio-${group.id}-${option.id}`}
                                                                                        label={
                                                                                            <span className="small" style={{ color: "#b6b4ff" }}>
                                                                                                <i className="pi pi-dot-circle text-primary me-1" />
                                                                                                {option.name}
                                                                                            </span>
                                                                                        }
                                                                                        checked={(selectedFilters[group.id] || [])[0] === option.id}
                                                                                        onChange={() => onRadioChange(group.id, option.id)}
                                                                                        className={`mb-2 ${styles.filterRadioOptionLabel}`} />
                                                                        ))
                                                                    }
                                                                </>
                                                            }
                                                        </Form>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        ) : (
                                            <Form>
                                                {
                                                    group.filterType === "checkbox" &&
                                                    group.options.map(option => (
                                                        <Form.Check key={option.id}
                                                                    type="switch"
                                                                    id={`filter-switch-${group.id}-${option.id}`}
                                                                    label={
                                                                        <span className="small" style={{ color: "#a2eafc" }}>
                                                                            <i className="pi pi-check-circle text-info me-1" />
                                                                            {option.name}
                                                                        </span>
                                                                    }
                                                                    checked={(selectedFilters[group.id] || []).includes(option.id)}
                                                                    onChange={() => onCheckboxChange(group.id, option.id)}
                                                                    className={`mb-2 ${styles.filterCheckboxOptionLabel}`} />
                                                    ))
                                                }
                                                {
                                                    group.filterType === "radio" &&
                                                    <>
                                                        <Form.Check type="radio"
                                                                    name={`filter-radio-group-${group.id}`}
                                                                    id={`filter-radio-${group.id}-clear`}
                                                                    label={
                                                                        <span className="small" style={{ color: "#b6b4ff" }}>
                                                                            <i className="pi pi-ban text-secondary me-1" />
                                                                            <span style={{ fontStyle: "italic" }}>None</span>
                                                                        </span>
                                                                    }
                                                                    checked={!((selectedFilters[group.id] || [])[0])}
                                                                    onChange={() => onRadioChange(group.id, null)}
                                                                    className={`mb-2 ${styles.filterRadioOptionLabel}`} />
                                                        {
                                                            group.options.map(option => (
                                                                <Form.Check key={option.id}
                                                                    type="radio"
                                                                    name={`filter-radio-group-${group.id}`}
                                                                    id={`filter-radio-${group.id}-${option.id}`}
                                                                    label={
                                                                        <span className="small" style={{ color: "#b6b4ff" }}>
                                                                            <i className="pi pi-dot-circle text-primary me-1" />
                                                                            {option.name}
                                                                        </span>
                                                                    }
                                                                    checked={(selectedFilters[group.id] || [])[0] === option.id}
                                                                    onChange={() => onRadioChange(group.id, option.id)}
                                                                    className={`mb-2 ${styles.filterRadioOptionLabel}`} />
                                                            ))
                                                        }
                                                    </>
                                                }
                                            </Form>
                                        )
                                    }
                                </Card.Body>
                            </Card>
                        ))
                }
            </Card.Body>
        </Card>
    );
}

export default ListFilter;