<?php
return array(
    'router' => array(
        'routes' => array(
            'divelog.rest.dive' => array(
                'type' => 'Segment',
                'options' => array(
                    'route' => '/dive[/:dive_id]',
                    'defaults' => array(
                        'controller' => 'Divelog\\V1\\Rest\\Dive\\Controller',
                    ),
                ),
            ),
            'divelog.rest.water-condition' => array(
                'type' => 'Segment',
                'options' => array(
                    'route' => '/water_condition[/:water_condition_id]',
                    'defaults' => array(
                        'controller' => 'Divelog\\V1\\Rest\\WaterCondition\\Controller',
                    ),
                ),
            ),
            'divelog.rest.country' => array(
                'type' => 'Segment',
                'options' => array(
                    'route' => '/country[/:country_id]',
                    'defaults' => array(
                        'controller' => 'Divelog\\V1\\Rest\\Country\\Controller',
                    ),
                ),
            ),
            'divelog.rest.dive-site' => array(
                'type' => 'Segment',
                'options' => array(
                    'route' => '/dive_site[/:dive_site_id]',
                    'defaults' => array(
                        'controller' => 'Divelog\\V1\\Rest\\DiveSite\\Controller',
                    ),
                ),
            ),
            'divelog.rest.diver' => array(
                'type' => 'Segment',
                'options' => array(
                    'route' => '/diver[/:diver_id]',
                    'defaults' => array(
                        'controller' => 'Divelog\\V1\\Rest\\Diver\\Controller',
                    ),
                ),
            ),
            'divelog.rest.water-exposure' => array(
                'type' => 'Segment',
                'options' => array(
                    'route' => '/water_exposure[/:water_exposure_id]',
                    'defaults' => array(
                        'controller' => 'Divelog\\V1\\Rest\\WaterExposure\\Controller',
                    ),
                ),
            ),
        ),
    ),
    'zf-versioning' => array(
        'uri' => array(
            0 => 'divelog.rest.dive',
            1 => 'divelog.rest.water-condition',
            2 => 'divelog.rest.country',
            3 => 'divelog.rest.dive-site',
            4 => 'divelog.rest.diver',
            5 => 'divelog.rest.water-exposure',
        ),
    ),
    'zf-rest' => array(
        'Divelog\\V1\\Rest\\Dive\\Controller' => array(
            'listener' => 'Divelog\\V1\\Rest\\Dive\\DiveResource',
            'route_name' => 'divelog.rest.dive',
            'route_identifier_name' => 'dive_id',
            'collection_name' => 'dive',
            'entity_http_methods' => array(
                0 => 'GET',
                1 => 'PATCH',
                2 => 'PUT',
                3 => 'DELETE',
            ),
            'collection_http_methods' => array(
                0 => 'GET',
                1 => 'POST',
            ),
            'collection_query_whitelist' => array(),
            'page_size' => 25,
            'page_size_param' => null,
            'entity_class' => 'Divelog\\V1\\Rest\\Dive\\DiveEntity',
            'collection_class' => 'Divelog\\V1\\Rest\\Dive\\DiveCollection',
            'service_name' => 'dive',
        ),
        'Divelog\\V1\\Rest\\WaterCondition\\Controller' => array(
            'listener' => 'Divelog\\V1\\Rest\\WaterCondition\\WaterConditionResource',
            'route_name' => 'divelog.rest.water-condition',
            'route_identifier_name' => 'water_condition_id',
            'collection_name' => 'water_condition',
            'entity_http_methods' => array(
                0 => 'GET',
                1 => 'PATCH',
                2 => 'PUT',
                3 => 'DELETE',
            ),
            'collection_http_methods' => array(
                0 => 'GET',
                1 => 'POST',
            ),
            'collection_query_whitelist' => array(),
            'page_size' => 25,
            'page_size_param' => null,
            'entity_class' => 'Divelog\\V1\\Rest\\WaterCondition\\WaterConditionEntity',
            'collection_class' => 'Divelog\\V1\\Rest\\WaterCondition\\WaterConditionCollection',
            'service_name' => 'water_condition',
        ),
        'Divelog\\V1\\Rest\\Country\\Controller' => array(
            'listener' => 'Divelog\\V1\\Rest\\Country\\CountryResource',
            'route_name' => 'divelog.rest.country',
            'route_identifier_name' => 'country_id',
            'collection_name' => 'country',
            'entity_http_methods' => array(
                0 => 'GET',
                1 => 'PATCH',
                2 => 'PUT',
                3 => 'DELETE',
            ),
            'collection_http_methods' => array(
                0 => 'GET',
                1 => 'POST',
            ),
            'collection_query_whitelist' => array(),
            'page_size' => 25,
            'page_size_param' => null,
            'entity_class' => 'Divelog\\V1\\Rest\\Country\\CountryEntity',
            'collection_class' => 'Divelog\\V1\\Rest\\Country\\CountryCollection',
            'service_name' => 'country',
        ),
        'Divelog\\V1\\Rest\\DiveSite\\Controller' => array(
            'listener' => 'Divelog\\V1\\Rest\\DiveSite\\DiveSiteResource',
            'route_name' => 'divelog.rest.dive-site',
            'route_identifier_name' => 'dive_site_id',
            'collection_name' => 'dive_site',
            'entity_http_methods' => array(
                0 => 'GET',
                1 => 'PATCH',
                2 => 'PUT',
                3 => 'DELETE',
            ),
            'collection_http_methods' => array(
                0 => 'GET',
                1 => 'POST',
            ),
            'collection_query_whitelist' => array(),
            'page_size' => 25,
            'page_size_param' => null,
            'entity_class' => 'Divelog\\V1\\Rest\\DiveSite\\DiveSiteEntity',
            'collection_class' => 'Divelog\\V1\\Rest\\DiveSite\\DiveSiteCollection',
            'service_name' => 'dive_site',
        ),
        'Divelog\\V1\\Rest\\Diver\\Controller' => array(
            'listener' => 'Divelog\\V1\\Rest\\Diver\\DiverResource',
            'route_name' => 'divelog.rest.diver',
            'route_identifier_name' => 'diver_id',
            'collection_name' => 'diver',
            'entity_http_methods' => array(
                0 => 'GET',
                1 => 'PATCH',
                2 => 'PUT',
                3 => 'DELETE',
            ),
            'collection_http_methods' => array(
                0 => 'GET',
                1 => 'POST',
            ),
            'collection_query_whitelist' => array(),
            'page_size' => 25,
            'page_size_param' => null,
            'entity_class' => 'Divelog\\V1\\Rest\\Diver\\DiverEntity',
            'collection_class' => 'Divelog\\V1\\Rest\\Diver\\DiverCollection',
            'service_name' => 'diver',
        ),
        'Divelog\\V1\\Rest\\WaterExposure\\Controller' => array(
            'listener' => 'Divelog\\V1\\Rest\\WaterExposure\\WaterExposureResource',
            'route_name' => 'divelog.rest.water-exposure',
            'route_identifier_name' => 'water_exposure_id',
            'collection_name' => 'water_exposure',
            'entity_http_methods' => array(
                0 => 'GET',
                1 => 'PATCH',
                2 => 'PUT',
                3 => 'DELETE',
            ),
            'collection_http_methods' => array(
                0 => 'GET',
                1 => 'POST',
            ),
            'collection_query_whitelist' => array(),
            'page_size' => 25,
            'page_size_param' => null,
            'entity_class' => 'Divelog\\V1\\Rest\\WaterExposure\\WaterExposureEntity',
            'collection_class' => 'Divelog\\V1\\Rest\\WaterExposure\\WaterExposureCollection',
            'service_name' => 'water_exposure',
        ),
    ),
    'zf-content-negotiation' => array(
        'controllers' => array(
            'Divelog\\V1\\Rest\\Dive\\Controller' => 'HalJson',
            'Divelog\\V1\\Rest\\WaterCondition\\Controller' => 'HalJson',
            'Divelog\\V1\\Rest\\Country\\Controller' => 'HalJson',
            'Divelog\\V1\\Rest\\DiveSite\\Controller' => 'HalJson',
            'Divelog\\V1\\Rest\\Diver\\Controller' => 'HalJson',
            'Divelog\\V1\\Rest\\WaterExposure\\Controller' => 'HalJson',
        ),
        'accept_whitelist' => array(
            'Divelog\\V1\\Rest\\Dive\\Controller' => array(
                0 => 'application/vnd.divelog.v1+json',
                1 => 'application/hal+json',
                2 => 'application/json',
            ),
            'Divelog\\V1\\Rest\\WaterCondition\\Controller' => array(
                0 => 'application/vnd.divelog.v1+json',
                1 => 'application/hal+json',
                2 => 'application/json',
            ),
            'Divelog\\V1\\Rest\\Country\\Controller' => array(
                0 => 'application/vnd.divelog.v1+json',
                1 => 'application/hal+json',
                2 => 'application/json',
            ),
            'Divelog\\V1\\Rest\\DiveSite\\Controller' => array(
                0 => 'application/vnd.divelog.v1+json',
                1 => 'application/hal+json',
                2 => 'application/json',
            ),
            'Divelog\\V1\\Rest\\Diver\\Controller' => array(
                0 => 'application/vnd.divelog.v1+json',
                1 => 'application/hal+json',
                2 => 'application/json',
            ),
            'Divelog\\V1\\Rest\\WaterExposure\\Controller' => array(
                0 => 'application/vnd.divelog.v1+json',
                1 => 'application/hal+json',
                2 => 'application/json',
            ),
        ),
        'content_type_whitelist' => array(
            'Divelog\\V1\\Rest\\Dive\\Controller' => array(
                0 => 'application/vnd.divelog.v1+json',
                1 => 'application/json',
            ),
            'Divelog\\V1\\Rest\\WaterCondition\\Controller' => array(
                0 => 'application/vnd.divelog.v1+json',
                1 => 'application/json',
            ),
            'Divelog\\V1\\Rest\\Country\\Controller' => array(
                0 => 'application/vnd.divelog.v1+json',
                1 => 'application/json',
            ),
            'Divelog\\V1\\Rest\\DiveSite\\Controller' => array(
                0 => 'application/vnd.divelog.v1+json',
                1 => 'application/json',
            ),
            'Divelog\\V1\\Rest\\Diver\\Controller' => array(
                0 => 'application/vnd.divelog.v1+json',
                1 => 'application/json',
            ),
            'Divelog\\V1\\Rest\\WaterExposure\\Controller' => array(
                0 => 'application/vnd.divelog.v1+json',
                1 => 'application/json',
            ),
        ),
    ),
    'zf-hal' => array(
        'metadata_map' => array(
            'Divelog\\V1\\Rest\\Dive\\DiveEntity' => array(
                'entity_identifier_name' => 'id',
                'route_name' => 'divelog.rest.dive',
                'route_identifier_name' => 'dive_id',
                'hydrator' => 'Zend\\Hydrator\\ArraySerializable',
            ),
            'Divelog\\V1\\Rest\\Dive\\DiveCollection' => array(
                'entity_identifier_name' => 'id',
                'route_name' => 'divelog.rest.dive',
                'route_identifier_name' => 'dive_id',
                'is_collection' => true,
            ),
            'Divelog\\V1\\Rest\\WaterCondition\\WaterConditionEntity' => array(
                'entity_identifier_name' => 'id',
                'route_name' => 'divelog.rest.water-condition',
                'route_identifier_name' => 'water_condition_id',
                'hydrator' => 'Zend\\Hydrator\\ArraySerializable',
            ),
            'Divelog\\V1\\Rest\\WaterCondition\\WaterConditionCollection' => array(
                'entity_identifier_name' => 'id',
                'route_name' => 'divelog.rest.water-condition',
                'route_identifier_name' => 'water_condition_id',
                'is_collection' => true,
            ),
            'Divelog\\V1\\Rest\\Country\\CountryEntity' => array(
                'entity_identifier_name' => 'id',
                'route_name' => 'divelog.rest.country',
                'route_identifier_name' => 'country_id',
                'hydrator' => 'Zend\\Hydrator\\ArraySerializable',
            ),
            'Divelog\\V1\\Rest\\Country\\CountryCollection' => array(
                'entity_identifier_name' => 'id',
                'route_name' => 'divelog.rest.country',
                'route_identifier_name' => 'country_id',
                'is_collection' => true,
            ),
            'Divelog\\V1\\Rest\\DiveSite\\DiveSiteEntity' => array(
                'entity_identifier_name' => 'id',
                'route_name' => 'divelog.rest.dive-site',
                'route_identifier_name' => 'dive_site_id',
                'hydrator' => 'Zend\\Hydrator\\ArraySerializable',
            ),
            'Divelog\\V1\\Rest\\DiveSite\\DiveSiteCollection' => array(
                'entity_identifier_name' => 'id',
                'route_name' => 'divelog.rest.dive-site',
                'route_identifier_name' => 'dive_site_id',
                'is_collection' => true,
            ),
            'Divelog\\V1\\Rest\\Diver\\DiverEntity' => array(
                'entity_identifier_name' => 'id',
                'route_name' => 'divelog.rest.diver',
                'route_identifier_name' => 'diver_id',
                'hydrator' => 'Zend\\Hydrator\\ArraySerializable',
            ),
            'Divelog\\V1\\Rest\\Diver\\DiverCollection' => array(
                'entity_identifier_name' => 'id',
                'route_name' => 'divelog.rest.diver',
                'route_identifier_name' => 'diver_id',
                'is_collection' => true,
            ),
            'Divelog\\V1\\Rest\\WaterExposure\\WaterExposureEntity' => array(
                'entity_identifier_name' => 'id',
                'route_name' => 'divelog.rest.water-exposure',
                'route_identifier_name' => 'water_exposure_id',
                'hydrator' => 'Zend\\Hydrator\\ArraySerializable',
            ),
            'Divelog\\V1\\Rest\\WaterExposure\\WaterExposureCollection' => array(
                'entity_identifier_name' => 'id',
                'route_name' => 'divelog.rest.water-exposure',
                'route_identifier_name' => 'water_exposure_id',
                'is_collection' => true,
            ),
        ),
    ),
    'zf-apigility' => array(
        'db-connected' => array(
            'Divelog\\V1\\Rest\\Dive\\DiveResource' => array(
                'adapter_name' => 'PostgreSQL',
                'table_name' => 'dive',
                'hydrator_name' => 'Zend\\Hydrator\\ArraySerializable',
                'controller_service_name' => 'Divelog\\V1\\Rest\\Dive\\Controller',
                'entity_identifier_name' => 'id',
            ),
            'Divelog\\V1\\Rest\\WaterCondition\\WaterConditionResource' => array(
                'adapter_name' => 'PostgreSQL',
                'table_name' => 'water_condition',
                'hydrator_name' => 'Zend\\Hydrator\\ArraySerializable',
                'controller_service_name' => 'Divelog\\V1\\Rest\\WaterCondition\\Controller',
                'entity_identifier_name' => 'id',
            ),
            'Divelog\\V1\\Rest\\Country\\CountryResource' => array(
                'adapter_name' => 'PostgreSQL',
                'table_name' => 'country',
                'hydrator_name' => 'Zend\\Hydrator\\ArraySerializable',
                'controller_service_name' => 'Divelog\\V1\\Rest\\Country\\Controller',
                'entity_identifier_name' => 'id',
            ),
            'Divelog\\V1\\Rest\\DiveSite\\DiveSiteResource' => array(
                'adapter_name' => 'PostgreSQL',
                'table_name' => 'dive_site',
                'hydrator_name' => 'Zend\\Hydrator\\ArraySerializable',
                'controller_service_name' => 'Divelog\\V1\\Rest\\DiveSite\\Controller',
                'entity_identifier_name' => 'id',
            ),
            'Divelog\\V1\\Rest\\Diver\\DiverResource' => array(
                'adapter_name' => 'PostgreSQL',
                'table_name' => 'diver',
                'hydrator_name' => 'Zend\\Hydrator\\ArraySerializable',
                'controller_service_name' => 'Divelog\\V1\\Rest\\Diver\\Controller',
                'entity_identifier_name' => 'id',
            ),
            'Divelog\\V1\\Rest\\WaterExposure\\WaterExposureResource' => array(
                'adapter_name' => 'PostgreSQL',
                'table_name' => 'water_exposure',
                'hydrator_name' => 'Zend\\Hydrator\\ArraySerializable',
                'controller_service_name' => 'Divelog\\V1\\Rest\\WaterExposure\\Controller',
                'entity_identifier_name' => 'id',
            ),
        ),
    ),
    'zf-content-validation' => array(
        'Divelog\\V1\\Rest\\Dive\\Controller' => array(
            'input_filter' => 'Divelog\\V1\\Rest\\Dive\\Validator',
        ),
        'Divelog\\V1\\Rest\\Country\\Controller' => array(
            'input_filter' => 'Divelog\\V1\\Rest\\Country\\Validator',
        ),
        'Divelog\\V1\\Rest\\Diver\\Controller' => array(
            'input_filter' => 'Divelog\\V1\\Rest\\Diver\\Validator',
        ),
    ),
    'input_filter_specs' => array(
        'Divelog\\V1\\Rest\\Dive\\Validator' => array(
            0 => array(
                'name' => 'id',
                'required' => true,
                'filters' => array(),
                'validators' => array(),
            ),
            1 => array(
                'name' => 'dive_nr',
                'required' => true,
                'filters' => array(),
                'validators' => array(),
            ),
            2 => array(
                'name' => 'diver_id',
                'required' => true,
                'filters' => array(),
                'validators' => array(
                    0 => array(
                        'name' => 'ZF\\ContentValidation\\Validator\\DbRecordExists',
                        'options' => array(
                            'adapter' => 'PostgreSQL',
                            'table' => 'diver',
                            'field' => 'id',
                        ),
                    ),
                ),
            ),
            3 => array(
                'name' => 'dive_site_id',
                'required' => true,
                'filters' => array(),
                'validators' => array(
                    0 => array(
                        'name' => 'ZF\\ContentValidation\\Validator\\DbRecordExists',
                        'options' => array(
                            'adapter' => 'PostgreSQL',
                            'table' => 'dive_site',
                            'field' => 'id',
                        ),
                    ),
                ),
            ),
            4 => array(
                'name' => 'depth',
                'required' => true,
                'filters' => array(
                    0 => array(
                        'name' => 'Zend\\Filter\\StripTags',
                    ),
                    1 => array(
                        'name' => 'Zend\\Filter\\Digits',
                    ),
                ),
                'validators' => array(),
            ),
            5 => array(
                'name' => 'date',
                'required' => true,
                'filters' => array(),
                'validators' => array(),
            ),
            6 => array(
                'name' => 'safety_stop',
                'required' => true,
                'filters' => array(),
                'validators' => array(),
            ),
            7 => array(
                'name' => 'bottom_time',
                'required' => true,
                'filters' => array(),
                'validators' => array(),
            ),
            8 => array(
                'name' => 'time_in',
                'required' => true,
                'filters' => array(),
                'validators' => array(),
            ),
            9 => array(
                'name' => 'time_out',
                'required' => true,
                'filters' => array(),
                'validators' => array(),
            ),
            10 => array(
                'name' => 'tank_pressure_start',
                'required' => true,
                'filters' => array(
                    0 => array(
                        'name' => 'Zend\\Filter\\StripTags',
                    ),
                    1 => array(
                        'name' => 'Zend\\Filter\\Digits',
                    ),
                ),
                'validators' => array(),
            ),
            11 => array(
                'name' => 'tank_pressure_end',
                'required' => true,
                'filters' => array(
                    0 => array(
                        'name' => 'Zend\\Filter\\StripTags',
                    ),
                    1 => array(
                        'name' => 'Zend\\Filter\\Digits',
                    ),
                ),
                'validators' => array(),
            ),
            12 => array(
                'name' => 'cylinder',
                'required' => true,
                'filters' => array(),
                'validators' => array(),
            ),
            13 => array(
                'name' => 'water_type',
                'required' => true,
                'filters' => array(),
                'validators' => array(),
            ),
            14 => array(
                'name' => 'surface_interval',
                'required' => false,
                'filters' => array(),
                'validators' => array(),
            ),
            15 => array(
                'name' => 'pressure_group_start',
                'required' => false,
                'filters' => array(),
                'validators' => array(),
            ),
            16 => array(
                'name' => 'pressure_group_end',
                'required' => false,
                'filters' => array(),
                'validators' => array(),
            ),
            17 => array(
                'name' => 'weight',
                'required' => false,
                'filters' => array(
                    0 => array(
                        'name' => 'Zend\\Filter\\StripTags',
                    ),
                    1 => array(
                        'name' => 'Zend\\Filter\\Digits',
                    ),
                ),
                'validators' => array(),
            ),
            18 => array(
                'name' => 'visibility',
                'required' => false,
                'filters' => array(
                    0 => array(
                        'name' => 'Zend\\Filter\\StripTags',
                    ),
                    1 => array(
                        'name' => 'Zend\\Filter\\Digits',
                    ),
                ),
                'validators' => array(),
            ),
            19 => array(
                'name' => 'temperature_air',
                'required' => false,
                'filters' => array(
                    0 => array(
                        'name' => 'Zend\\Filter\\StripTags',
                    ),
                    1 => array(
                        'name' => 'Zend\\Filter\\Digits',
                    ),
                ),
                'validators' => array(),
            ),
            20 => array(
                'name' => 'temperature_surface',
                'required' => false,
                'filters' => array(
                    0 => array(
                        'name' => 'Zend\\Filter\\StripTags',
                    ),
                    1 => array(
                        'name' => 'Zend\\Filter\\Digits',
                    ),
                ),
                'validators' => array(),
            ),
            21 => array(
                'name' => 'temperature_bottom',
                'required' => false,
                'filters' => array(
                    0 => array(
                        'name' => 'Zend\\Filter\\StripTags',
                    ),
                    1 => array(
                        'name' => 'Zend\\Filter\\Digits',
                    ),
                ),
                'validators' => array(),
            ),
            22 => array(
                'name' => 'rating',
                'required' => false,
                'filters' => array(
                    0 => array(
                        'name' => 'Zend\\Filter\\StripTags',
                    ),
                    1 => array(
                        'name' => 'Zend\\Filter\\Digits',
                    ),
                ),
                'validators' => array(),
            ),
            23 => array(
                'name' => 'comment',
                'required' => false,
                'filters' => array(
                    0 => array(
                        'name' => 'Zend\\Filter\\StringTrim',
                    ),
                    1 => array(
                        'name' => 'Zend\\Filter\\StripTags',
                    ),
                ),
                'validators' => array(
                    0 => array(
                        'name' => 'Zend\\Validator\\StringLength',
                        'options' => array(
                            'min' => 1,
                            'max' => null,
                        ),
                    ),
                ),
            ),
        ),
        'Divelog\\V1\\Rest\\Country\\Validator' => array(
            0 => array(
                'name' => 'id',
                'required' => true,
                'filters' => array(),
                'validators' => array(),
            ),
            1 => array(
                'name' => 'name',
                'required' => true,
                'filters' => array(
                    0 => array(
                        'name' => 'Zend\\Filter\\StringTrim',
                    ),
                    1 => array(
                        'name' => 'Zend\\Filter\\StripTags',
                    ),
                ),
                'validators' => array(
                    0 => array(
                        'name' => 'Zend\\Validator\\StringLength',
                        'options' => array(
                            'min' => 1,
                            'max' => null,
                        ),
                    ),
                ),
            ),
            2 => array(
                'name' => 'code',
                'required' => true,
                'filters' => array(
                    0 => array(
                        'name' => 'Zend\\Filter\\StringTrim',
                    ),
                    1 => array(
                        'name' => 'Zend\\Filter\\StripTags',
                    ),
                ),
                'validators' => array(
                    0 => array(
                        'name' => 'Zend\\Validator\\StringLength',
                        'options' => array(
                            'min' => 1,
                            'max' => null,
                        ),
                    ),
                ),
            ),
        ),
        'Divelog\\V1\\Rest\\Diver\\Validator' => array(
            0 => array(
                'name' => 'id',
                'required' => true,
                'filters' => array(),
                'validators' => array(),
            ),
            1 => array(
                'name' => 'first_name',
                'required' => true,
                'filters' => array(
                    0 => array(
                        'name' => 'Zend\\Filter\\StringTrim',
                    ),
                    1 => array(
                        'name' => 'Zend\\Filter\\StripTags',
                    ),
                ),
                'validators' => array(
                    0 => array(
                        'name' => 'Zend\\Validator\\StringLength',
                        'options' => array(
                            'min' => 1,
                            'max' => null,
                        ),
                    ),
                ),
            ),
            2 => array(
                'name' => 'last_name',
                'required' => true,
                'filters' => array(
                    0 => array(
                        'name' => 'Zend\\Filter\\StringTrim',
                    ),
                    1 => array(
                        'name' => 'Zend\\Filter\\StripTags',
                    ),
                ),
                'validators' => array(
                    0 => array(
                        'name' => 'Zend\\Validator\\StringLength',
                        'options' => array(
                            'min' => 1,
                            'max' => null,
                        ),
                    ),
                ),
            ),
            3 => array(
                'name' => 'date_of_birth',
                'required' => true,
                'filters' => array(),
                'validators' => array(),
            ),
        ),
    ),
);
